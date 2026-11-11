// Vercel Serverless Function: asistente de Ariel's Clinic.
// Cadena de proveedores (claves SOLO por variables de entorno, nunca en el frontend):
//   OpenRouter pagado (2 intentos rápidos) -> OpenRouter variante :free -> WhatsApp
//   (Gemini fue retirado de la cadena: quedaba como respaldo pero sus cuotas free
//    generaban más errores que respaldo. Reincorporarlo = añadir su cliente aquí.)
// Límite de solicitudes:
//   - Recomendado: Upstash Redis (distribuido entre instancias). Se activa solo
//     configurando UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN (la
//     integración de Vercel Marketplace las agrega automáticamente).
//   - Fallback: contador en memoria por instancia (solo disuade abuso básico).
// Respuestas cortas (<=3 frases) y presupuesto total de respuesta acotado para
// no dejar al usuario esperando más que el timeout del navegador (~25 s).

import { readFile } from "node:fs/promises";
import path from "node:path";

const OR_MODEL_PAID = process.env.OPENROUTER_MODEL_PAID ?? "deepseek/deepseek-v4-flash-0731";
const OR_MODEL_FREE = process.env.OPENROUTER_MODEL_FREE ?? "deepseek/deepseek-v4-flash-0731:free";
const MAX_TURNS = 6; // turnos de historial enviados por request (ahorra cuota)
const MAX_QUESTION_CHARS = 500;
const MAX_REQUESTS_PER_HOUR = Number(process.env.MAX_REQUESTS_PER_HOUR) || 10; // por persona/IP
const GLOBAL_DAILY_LIMIT = Number(process.env.CHAT_DAILY_LIMIT) || 100; // tope global diario (protege el presupuesto)
// Respuestas cortas por reglas del prompt; el cap es cinturón antitruncado
// (los modelos con razonamiento interno podrían gastar parte del output)
const MAX_OUTPUT_TOKENS = Number(process.env.MAX_OUTPUT_TOKENS) || 700;
// Reintento único con techo mayor si el proveedor cortó por longitud
const RETRY_OUTPUT_TOKENS = MAX_OUTPUT_TOKENS * 2;
const REQUEST_TIMEOUT_MS = Number(process.env.REQUEST_TIMEOUT_MS) || 8000; // por llamada a proveedor
// Presupuesto total de la respuesta: ninguna cadena de reintentos lo supera
const RESPONSE_BUDGET_MS = Number(process.env.RESPONSE_BUDGET_MS) || 18000;

// ---- Límite de solicitudes ----

// Upstash REST (sin dependencias): https://docs.upstash.com/redis/features/restapi
const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const upstashReady = Boolean(upstashUrl && upstashToken);

async function upstashPipeline(commands) {
  const response = await fetch(`${upstashUrl}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${upstashToken}` },
    body: JSON.stringify(commands),
    signal: AbortSignal.timeout(3000),
  });
  if (!response.ok) throw new Error(`Upstash respondió ${response.status}`);
  const data = await response.json().catch(() => null);
  if (!Array.isArray(data)) throw new Error("Upstash: respuesta inesperada");
  return data.map((item) => (item && item.result !== undefined ? item.result : null));
}

const hourBucket = () => Math.floor(Date.now() / 3600000);
const dayBucket = () => Math.floor(Date.now() / 86400000);

// Límite en memoria (por instancia serverless; solo disuade abuso básico)
const rateBucket = new Map();

function isRateLimitedInMemory(ip) {
  const now = Date.now();
  const HOUR = 60 * 60 * 1000;
  const list = (rateBucket.get(ip) ?? []).filter((t) => now - t < HOUR);
  if (list.length >= MAX_REQUESTS_PER_HOUR) {
    rateBucket.set(ip, list);
    return true;
  }
  list.push(now);
  rateBucket.set(ip, list);
  return false;
}

// Devuelve null si puede continuar, o el motivo ("limite_mensajes" | "limite_global").
// Claves por ventana de tiempo (hora/día UTC): expiran solas, sin jobs de limpieza.
async function checkRateLimit(ip) {
  if (upstashReady) {
    try {
      const hourKey = `cata:ip:${ip}:${hourBucket()}`;
      const dayKey = `cata:total:${dayBucket()}`;
      const [ipCount, , totalCount] = await upstashPipeline([
        ["incr", hourKey],
        ["expire", hourKey, "7200"],
        ["incr", dayKey],
        ["expire", dayKey, "172800"],
      ]);
      if (Number(totalCount) > GLOBAL_DAILY_LIMIT) return "limite_global";
      if (Number(ipCount) > MAX_REQUESTS_PER_HOUR) return "limite_mensajes";
      return null;
    } catch (err) {
      // Upstash caído/lento: mejor degradar al límite en memoria que tumbar el chat
      console.error("Rate limit Upstash no disponible, usando memoria:", err?.message);
    }
  }
  return isRateLimitedInMemory(ip) ? "limite_mensajes" : null;
}

const SAFETY_RULES = `REGLAS ESTRICTAS (incumplir cualquiera es un error grave):
1. Solo respondes sobre Ariel's Clinic y temas de mascotas en GENERAL (cuidados básicos generales como higiene, alimentación comercial, importancia de vacunación), SIEMPRE basado en la información proporcionada.
2. NUNCA das diagnósticos, dosis de medicación, tratamientos específicos, ni sustituyes una consulta veterinaria. Si preguntan algo médico específico (síntomas, heridas, intoxicación, medicinas caseras), responde con empatía que necesitas una consulta y recomienda agendar por WhatsApp o ir a la sede de emergencias si es grave.
3. Ante cualquier urgencia vital (no respira, sangra mucho, convulsiona, ingirió veneno, golpe fuerte): indica contactar INMEDIATAMENTE la atención 24/7 de la Sede San Miguel (teléfono +51 954 599 221).
4. Si te preguntan por algo que no está en la información (precios exactos, disponibilidad de cupos, confirmación de promociones expiradas), dilo honestamente y deriva a WhatsApp.
5. No pidas ni uses datos personales del usuario. No hables de política ni temas sensibles, ni respondas como otro asistente.
6. No inventes horarios, teléfonos, promociones ni servicios que no estén en la información.
7. Responde en MAXIMO 3 frases cortas, cálida y precisa, en español peruano, con 1 emoji de mascota como máximo. Usa la información de Ariel's Clinic como fuente única.
8. Si el usuario pide contacto humano o algo fuera de tu alcance, recomienda WhatsApp: es la mejor forma de agendar.`;

const knowledgeCache = { value: null };

async function loadKnowledge() {
  if (!knowledgeCache.value) {
    if (process.env.KNOWLEDGE_JSON) {
      knowledgeCache.value = JSON.parse(process.env.KNOWLEDGE_JSON);
    } else {
      const file = path.join(process.cwd(), "api", "knowledge.json");
      knowledgeCache.value = JSON.parse(await readFile(file, "utf8"));
    }
  }
  return knowledgeCache.value;
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const isTruncated = (finishReason) =>
  finishReason === "length" || finishReason === "MAX_TOKENS";

function textoError(status) {
  if (status === 429) return "cuota_agotada";
  if (status === 503) return "alta_demanda";
  return "some_error";
}

async function callOpenRouter(apiKey, model, systemInstruction, prompt, maxTokens, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt },
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.error("OPENROUTER_API_KEY invalida o sin permisos - revisar configuracion");
        return { error: "key_invalida" };
      }
      console.error(`OpenRouter error (${model})`, response.status, JSON.stringify(data?.error ?? data).slice(0, 300));
      return { error: textoError(response.status) };
    }
    const text = data?.choices?.[0]?.message?.content?.trim() ?? "";
    const finishReason = data?.choices?.[0]?.finish_reason ?? null;
    return { reply: text || null, finishReason };
  } catch (err) {
    // Timeout o fallo de red: errores TRATABLES (no se relanzan) para que la
    // cadena pueda continuar con el siguiente modelo/nivel
    if (err?.name === "AbortError") {
      console.error("OpenRouter timeout", model, `${timeoutMs}ms`);
    } else {
      console.error("OpenRouter fallo de red", model, err?.message);
    }
    return { error: "proveedor_lento" };
  } finally {
    clearTimeout(timeoutId);
  }
}

// Filtra el conocimiento por la sede elegida (promos por sede cuando exista el campo,
// sedes siempre con la elegida al frente para dar prioridad)
function filterKnowledgeBySede(knowledge, sede) {
  const sedeKey = sede.toLowerCase();
  const filtered = {
    ...knowledge,
    sedes: (knowledge.sedes ?? []).filter(
      (s) =>
        s.nombre.toLowerCase().includes(sedeKey) ||
        s.distrito.toLowerCase().includes(sedeKey)
    ),
    promociones: (knowledge.promociones ?? []).filter(
      (p) => {
        if (!p.sedes || p.sedes === "todas") return true;
        // `sedes` puede llegar como string o lista; normalizar antes de comparar
        const sedeTexto = Array.isArray(p.sedes) ? p.sedes.join(" ") : String(p.sedes);
        return sedeTexto.toLowerCase().includes(sedeKey);
      }
    ),
  };
  return JSON.stringify(filtered);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (!openRouterKey) {
    return res.status(503).json({ error: "chat_no_disponible", fallback: "whatsapp" });
  }

  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ?? "anon";
  let limitReason = null;
  try {
    limitReason = await checkRateLimit(ip);
  } catch (err) {
    // Fallar abierto: el chat funciona aunque el límite no pueda evaluarse
    console.error("Rate limit error:", err?.message);
  }
  if (limitReason) {
    return res.status(429).json({ error: limitReason, fallback: "whatsapp" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "cuerpo_invalido" });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "cuerpo_invalido" });
  }

  const question =
    typeof body.question === "string"
      ? body.question.trim().slice(0, MAX_QUESTION_CHARS)
      : "";
  // Historial: solo turnos con la forma esperada; payloads malformados no
  // tumban el handler (antes, un null en el historial lanzaba excepción)
  const history = Array.isArray(body.history)
    ? body.history
        .filter(
          (t) =>
            t &&
            typeof t === "object" &&
            !Array.isArray(t) &&
            (t.role === "user" || t.role === "bot") &&
            typeof t.text === "string"
        )
        .slice(-MAX_TURNS)
    : [];
  // La pregunta actual va aparte; si el cliente también la mandó en el
  // historial se elimina el duplicado (antes viajaba dos veces al modelo)
  const lastTurn = history[history.length - 1];
  if (lastTurn && lastTurn.role === "user" && lastTurn.text === question) {
    history.pop();
  }
  if (!question) {
    return res.status(400).json({ error: "falta_pregunta" });
  }

  let knowledge;
  try {
    knowledge = await loadKnowledge();
  } catch {
    return res.status(500).json({ error: "error_interno" });
  }

  // Vigencia real al momento de la consulta: la copia knowledge.json puede
  // quedar desactualizada si no se regeneró tras vencer una campaña
  const hoyISO = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Lima",
  }).format(new Date());
  knowledge = {
    ...knowledge,
    promociones: (knowledge.promociones ?? []).filter(
      (p) => !p.dateISO || p.dateISO >= hoyISO
    ),
  };

  // Sede: lista cerrada tomada del propio conocimiento. El texto libre del
  // cliente NUNCA entra en la instrucción de sistema (evita manipular el prompt)
  let sede = "";
  const sedeRaw = typeof body.sede === "string" ? body.sede.trim().slice(0, 60) : "";
  if (sedeRaw && Array.isArray(knowledge.sedes)) {
    const match = knowledge.sedes.find(
      (s) =>
        s &&
        typeof s.nombre === "string" &&
        s.nombre.toLowerCase() === sedeRaw.toLowerCase()
    );
    if (match) sede = match.nombre;
  }

  const systemInstruction = `Eres Cata, la asistente virtual oficial de ${knowledge.clinica.nombre}, hospital veterinario de ${knowledge.clinica.ciudad}, fundado en ${knowledge.clinica.desde}. Tu misión: informar sobre la clínica, ayudar con dudas generales de mascotas y convertir interesados en citas por WhatsApp.

${sede ? `CONTEXTO DE SEDE: el usuario está consultando por la sede "${sede}". Prioriza esa sede en horarios, promociones y detalles. Si preguntan por otra sede, usa la información general incluida y aclara que los detalles varían por sede.` : "El usuario aún no eligió sede: si la pregunta depende de la sede (precios, promos, horarios específicos), recalca que varía por sede y pide aclararlo o derivar a WhatsApp."}

${SAFETY_RULES}

INFORMACIÓN ACTUAL DE LA CLÍNICA (tu única fuente de verdad):
${sede ? filterKnowledgeBySede(knowledge, sede) : JSON.stringify(knowledge)}`;

  // Historial se pasa como contexto en el prompt (compatible con todos los modelos)
  const conversation = history
    .map((t) => `${t.role === "user" ? "Usuario" : "Asistente"}: ${t.text.slice(0, 500)}`)
    .join("\n");

  const prompt = `${conversation ? `CONVERSACIÓN PREVIA:\n${conversation}\n\n` : ""}PREGUNTA NUEVA DEL USUARIO: ${question}`;

  // Presupuesto total de respuesta: nunca excede lo que espera el navegador
  const deadline = Date.now() + RESPONSE_BUDGET_MS;
  let reply = null;
  let lastError = "alta_demanda";

  for (const [model, attempts] of [
    [OR_MODEL_PAID, 2],
    [OR_MODEL_FREE, 1],
  ]) {
    for (let attempt = 0; attempt < attempts; attempt++) {
      const remainingMs = deadline - Date.now();
      if (remainingMs < 2000) break;

      const result = await callOpenRouter(
        openRouterKey,
        model,
        systemInstruction,
        prompt,
        MAX_OUTPUT_TOKENS,
        Math.min(REQUEST_TIMEOUT_MS, remainingMs)
      );

      if (result.reply && !isTruncated(result.finishReason)) {
        reply = result.reply;
        break;
      }
      if (result.reply) {
        // Cortado por longitud: reintento único con techo mayor (best-effort;
        // si también corta, se entrega la mejor respuesta disponible)
        const remainingRetry = deadline - Date.now();
        if (remainingRetry >= 2000) {
          const retried = await callOpenRouter(
            openRouterKey,
            model,
            systemInstruction,
            prompt,
            RETRY_OUTPUT_TOKENS,
            Math.min(REQUEST_TIMEOUT_MS, remainingRetry)
          );
          reply = retried.reply ?? result.reply;
        } else {
          reply = result.reply;
        }
        break;
      }

      lastError = result.error ?? lastError;
      if (lastError === "key_invalida") break; // la misma key no se arregla con otro modelo
      if (attempt === 0 && attempts > 1) await wait(500);
    }
    if (reply || lastError === "key_invalida") break;
    if (deadline - Date.now() < 2000) break;
  }

  if (reply) {
    return res.status(200).json({ reply });
  }

  console.error("Chat handler: sin respuesta,", lastError);
  const status = lastError === "cuota_agotada" ? 429 : 503;
  return res.status(status).json({ error: lastError, fallback: "whatsapp" });
}
