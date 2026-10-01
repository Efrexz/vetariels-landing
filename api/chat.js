// Vercel Serverless Function: asistente de Ariel's Clinic.
// Cadena de proveedores (claves SOLO por variables de entorno, nunca en el frontend):
//   Con OPENROUTER_API_KEY: OpenRouter DeepSeek V4 Flash (principal) -> Gemini free (respaldo) -> WhatsApp
//   Sin OPENROUTER_API_KEY: Gemini free (3 reintentos + alias) -> OpenRouter (si existiera) -> WhatsApp
// Respuestas cortas (<=3 frases) y maxOutputTokens moderado para ahorrar tokens y cuanto antes responder.

import { readFile } from "node:fs/promises";
import path from "node:path";

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-3.8-flash";
const GEMINI_FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL ?? "gemini-flash-latest";
const OR_MODEL_PAID = process.env.OPENROUTER_MODEL_PAID ?? "deepseek/deepseek-v4-flash-0731";
const OR_MODEL_FREE = process.env.OPENROUTER_MODEL_FREE ?? "deepseek/deepseek-v4-flash-0731:free";
const MAX_TURNS = 6; // turnos de historial enviados por request (ahorra cuota)
const MAX_QUESTION_CHARS = 500;
const MAX_REQUESTS_PER_HOUR = 12;
const MAX_OUTPUT_TOKENS = 320; // respuestas cortas y precisas

// Rate limit simple en memoria (por instancia serverless; suficiente para disuadir abuso)
const rateBucket = new Map();

function isRateLimited(ip) {
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
      (p) => !p.sedes || p.sedes === "todas" || p.sedes.toLowerCase().includes(sedeKey)
    ),
  };
  return JSON.stringify(filtered, null, 2);
}

async function callGemini(apiKey, model, systemInstruction, prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Obligatorio: las keys de Google (AIza y AQ.) se autentican por header
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: MAX_OUTPUT_TOKENS,
        },
      }),
    }
  );

  const data = await response.json().catch(() => ({}));

  if (response.status === 429) {
    return { error: "cuota_agotada" };
  }
  if (response.status === 404) {
    console.error("Modelo Gemini no disponible:", model, "(actualiza GEMINI_MODEL)");
    return { error: "modelo_no_disponible" };
  }
  if (!response.ok) {
    const errMessage = data?.error?.message ?? "";
    if (response.status === 400 && /API key not valid|API_KEY_INVALID/i.test(errMessage)) {
      console.error("GEMINI_API_KEY invalida - revisar configuracion");
      return { error: "key_invalida" };
    }
    console.error(`Gemini error ${response.status} (${model})`, JSON.stringify(data?.error ?? data).slice(0, 300));
    return { error: textoError(response.status) };
  }

  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim() ?? "";
  return { reply: text || null };
}

function textoError(status) {
  if (status === 503) return "alta_demanda";
  if (status >= 500) return "some_error";
  return "some_error";
}

async function callOpenRouter(apiKey, model, systemInstruction, prompt) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: prompt },
      ],
      max_tokens: MAX_OUTPUT_TOKENS,
      temperature: 0.7,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error(`OpenRouter error (${model})`, response.status, JSON.stringify(data?.error ?? data).slice(0, 300));
    return null;
  }
  const text = data?.choices?.[0]?.message?.content?.trim() ?? "";
  return text || null;
}

// Encuentra una respuesta recorriendo los niveles configurados.
// Devuelve {reply} o {error} con el error mas relevante para el frontend.
async function askAI(apiKey, openRouterKey, systemInstruction, prompt) {
  let lastError = "alta_demanda";

  if (openRouterKey) {
    // Principal: DeepSeek V4 Flash pagado (estable, sin limite diario) - 2 intentos rapidos
    for (const [attempt, delay] of [[0, 0], [1, 500]]) {
      if (delay) await wait(delay);
      const reply = await callOpenRouter(openRouterKey, OR_MODEL_PAID, systemInstruction, prompt);
      if (reply) return { reply };
      console.error(`OpenRouter intento ${attempt + 1}/2 con ${OR_MODEL_PAID} sin respuesta`);
    }

    // Nivel 2: variante :free de OpenRouter ($0)
    const freeReply = await callOpenRouter(openRouterKey, OR_MODEL_FREE, systemInstruction, prompt);
    if (freeReply) return { reply: freeReply };

    // Nivel 3: Gemini free como red de seguridad final (si la key esta configurada)
    if (apiKey) {
      const geminiResult = await geminiWithShortRetries(apiKey, systemInstruction, prompt);
      if (geminiResult.reply) return geminiResult;
      lastError = geminiResult.error ?? lastError;
    }
    return { error: lastError };
  }

  // Sin OpenRouter: cadena original Gemini-first
  return geminiWithShortRetries(apiKey, systemInstruction, prompt);
}

async function geminiWithShortRetries(apiKey, systemInstruction, prompt) {
  let lastError = "alta_demanda";
  for (const model of [GEMINI_MODEL, GEMINI_FALLBACK_MODEL]) {
    const result = await callGemini(apiKey, model, systemInstruction, prompt);
    if (result.reply) return result;
    lastError = result.error ?? lastError;
    if (lastError === "cuota_agotada" || lastError === "key_invalida") break;
    await wait(900);
  }
  return { error: lastError };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (!geminiKey && !openRouterKey) {
    return res.status(503).json({ error: "chat_no_disponible", fallback: "whatsapp" });
  }

  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ?? "anon";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "limite_mensajes", fallback: "whatsapp" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "cuerpo_invalido" });
  }

  const history = Array.isArray(body?.history) ? body.history.slice(-MAX_TURNS) : [];
  const question = String(body?.question ?? "").trim().slice(0, MAX_QUESTION_CHARS);
  const sede = String(body?.sede ?? "").trim().slice(0, 60);
  if (!question) {
    return res.status(400).json({ error: "falta_pregunta" });
  }

  let knowledge;
  try {
    knowledge = await loadKnowledge();
  } catch {
    return res.status(500).json({ error: "error_interno" });
  }

  const systemInstruction = `Eres Cata, la asistente virtual oficial de ${knowledge.clinica.nombre}, hospital veterinario de ${knowledge.clinica.ciudad}, fundado en ${knowledge.clinica.desde}. Tu misión: informar sobre la clínica, ayudar con dudas generales de mascotas y convertir interesados en citas por WhatsApp.

${sede ? `CONTEXTO DE SEDE: el usuario está consultando por la sede "${sede}". Prioriza esa sede en horarios, promociones y detalles. Si preguntan por otra sede, usa la información general incluida y aclara que los detalles varían por sede.` : "El usuario aún no eligió sede: si la pregunta depende de la sede (precios, promos, horarios específicos), recalca que varía por sede y pide aclararlo o derivar a WhatsApp."}

${SAFETY_RULES}

INFORMACIÓN ACTUAL DE LA CLÍNICA (tu única fuente de verdad):
${sede ? filterKnowledgeBySede(knowledge, sede) : JSON.stringify(knowledge, null, 2)}`;

  // Historial se pasa como contexto en el prompt (compatible con todos los modelos)
  const conversation = history
    .filter((t) => t.role === "user" || t.role === "bot")
    .map((t) => `${t.role === "user" ? "Usuario" : "Asistente"}: ${String(t.text).slice(0, 500)}`)
    .join("\n");

  const prompt = `${conversation ? `CONVERSACIÓN PREVIA:\n${conversation}\n\n` : ""}PREGUNTA NUEVA DEL USUARIO: ${question}`;

  try {
    const { reply, error } = await askAI(geminiKey, openRouterKey, systemInstruction, prompt);

    if (error === "cuota_agotada") {
      return res.status(429).json({ error: "cuota_agotada", fallback: "whatsapp" });
    }
    if (error === "key_invalida") {
      return res.status(500).json({ error: "key_invalida", fallback: "whatsapp" });
    }
    if (!reply) {
      console.error("Chat handler: sin respuesta,", error);
      return res.status(503).json({ error: "alta_demanda", fallback: "whatsapp" });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat handler:", err.message);
    return res.status(502).json({ error: "error_ia", fallback: "whatsapp" });
  }
}
