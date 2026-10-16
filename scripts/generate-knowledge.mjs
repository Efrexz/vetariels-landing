import { mkdir, writeFile, readFile } from "node:fs/promises";
import locations from "../src/data/locations.js";
// promotions.js es data plana, cargable en Node
import promotionsModule from "../src/data/promotions.js";
import faqs from "../src/data/faqs.js";

// services.js importa iconos TS de lucide (no cargable en Node puro) -> parseo textual por bloque:
// cada servicio es un objeto `{ ... }` sin llaves anidadas; filtramos los que traen `id:`
const servicesRaw = await readFile("src/data/services.js", "utf8");
const services = [...servicesRaw.matchAll(/\{[^{}]*\}/gs)]
  .map((m) => m[0])
  .filter((block) => /id:\s*"/.test(block))
  .map((block) => ({
    titulo: block.match(/title:\s*"([^"]+)"/)?.[1] ?? "",
    descripcion: block.match(/description:\s*"([\s\S]*?)"/)?.[1] ?? "",
    nota: block.match(/nota:\s*"([^"]+)"/)?.[1] ?? "",
    incluye: [...(block.match(/items:\s*\[([\s\S]*?)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((i) => i[1]),
  }))
  .filter((service) => service.titulo);

// Información operativa solo para el asistente (no se muestra en la web)
const informacion = {
  especies: "Atendemos perros y gatos.",
  atencion:
    "Toda la atención es por orden de llegada. Para baños/grooming se recomienda acercarse a partir de las 9 AM, cuando inicia el área de grooming.",
  preciosConsulta: {
    sanMiguel: "S/50 (perro o gato, sin importar la edad).",
    sanMartinDePorresYLosOlivos:
      "Perros: menores de 7 años S/20, mayores de 7 años S/40. Gatos: menores de 7 años S/25, mayores de 7 años S/45.",
    nota: "Los precios de consulta pueden variar; si tienen duda puntual, deriva al counter o WhatsApp.",
  },
  consultasEspecializadas:
    "Contamos con consultas especializadas en dermatología, cardiología, neurología, oncología, odontología (profilaxis, extracciones, cirugía oral) y neumología. Son de pago previo y el día y hora se coordinan con el especialista según su disponibilidad. Se agendan por WhatsApp.",
  internamiento:
    "El internamiento se realiza en la sede San Miguel con monitoreo 24/7. Si la mascota está en San Martín de Porres o Los Olivos, la clínica se encarga del traslado del paciente.",
  pagos:
    "Aceptamos todos los medios de pago (efectivo, tarjeta, Yape, Plin, transferencia). En promociones y campañas el pago suele ser con efectivo, Yape, Plin o transferencia (igual pueden consultar en counter). Con tarjeta de crédito se requiere presentar el DNI del titular y que esté presente al momento del pago.",
  grooming:
    "Servicio de baño y corte. Costo según peso de la mascota y tipo de pelaje (incluye si tiene motas o no); se confirma al momento de llegar con la mascota. Por WhatsApp se puede pedir un costo aproximado. Dos formas de agendar: acercarse a la clínica (por orden de llegada, recomendado a partir de las 9 AM cuando inicia el área de grooming) o coordinar con la movilidad desde la página de agenda (https://agenda-ariels-nu.vercel.app/?utm_source=vetariel-landing), donde el costo de la movilidad depende de la dirección y se confirma al completar la agenda (la dirección llega al counter). Cite el botón 'Agenda grooming' en la parte superior derecha de la página.",
  redesSociales: {
    instagram: "@arielsclinichospital",
    facebook: "Ariels Clinic HV",
    tiktok: "@arielsclinichospital",
    uso: "Anunciamos promociones y campañas en redes; puedes mencionarlas para que se enteren de las promos vigentes.",
  },
};

// Solo promociones vigentes (por dateISO) llegan al asistente
const hoyISO = new Date().toISOString().slice(0, 10);
const promosVigentes = promotionsModule.filter((p) => !p.dateISO || p.dateISO >= hoyISO);
const promocionesVencidas = promotionsModule.length - promosVigentes.length;

const precioPromo = (p) =>
  (p.prices ?? []).map((c) => `${c.category}: ${c.details.map((d) => `${d.type} S/${d.price}`).join(", ")}`).join(" | ");

const knowledge = {
  clinica: {
    nombre: "Ariel's Clinic - Hospital Veterinario",
    desde: 2003,
    ciudad: "Lima, Perú",
    whatsappPrincipal: "+51 954 599 221",
  },
  servicios: services,
  sedes: locations.map((l) => ({
    nombre: l.name,
    direccion: l.address.street,
    distrito: l.address.locality,
    telefono: l.phone,
    horario: `${l.hours.weekdays} de lunes a domingo`,
    emergencias247: l.hours.weekdays === "24/7",
  })),
  promociones: promosVigentes.map((p) => ({
    titulo: p.title,
    detalle: p.subtitle,
    incluye: p.includes ?? [],
    condiciones: p.conditions ?? [],
    precios: precioPromo(p),
    vigenteHasta: p.expirationDate ?? "consultar con la clínica",
    sedes: p.sedes ?? "todas",
  })),
  informacion,
  faqs: faqs.map((f) => ({ pregunta: f.question, respuesta: f.answer })),
};

await mkdir("api", { recursive: true });
await writeFile("api/knowledge.json", JSON.stringify(knowledge, null, 2));
console.log(
  `api/knowledge.json generado: ${services.length} servicios, ${locations.length} sedes, ${promocionesVencidas > 0 ? `${promosVigentes.length} promociones vigentes (${promocionesVencidas} expiradas omitidas)` : `${promosVigentes.length} promociones`}, ${faqs.length} FAQs`
);
