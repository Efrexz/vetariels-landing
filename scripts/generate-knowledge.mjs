import { mkdir, writeFile, readFile } from "node:fs/promises";
import locations from "../src/data/locations.js";
// promotions.js importa iconos? no - es data plana, pero por si acaso se parsea solo sedes si existiera
import promotionsModule from "../src/data/promotions.js";
import faqs from "../src/data/faqs.js";

// services.js importa iconos TS de lucide (no cargable en Node puro) -> parseo textual
const servicesRaw = await readFile("src/data/services.js", "utf8");
const services = [...servicesRaw.matchAll(/title:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"[\s\S]*?(?:items:\s*\[([^\]]*)\])?/g)]
  .map((m) => ({
    titulo: m[1],
    descripcion: m[2],
    incluye: m[3]
      ? [...m[3].matchAll(/"([^"]+)"/g)].map((i) => i[1])
      : [],
  }));

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
    horario: `${l.hours.weekdays} (lunes a viernes) / ${l.hours.weekends} (fines de semana)`,
  })),
  promociones: promotionsModule.map((p) => ({
    titulo: p.title,
    detalle: p.subtitle,
    vigenteHasta: p.expirationDate ?? "consultar con la clínica",
    sedes: p.sedes ?? "todas",
  })),
  faqs: faqs.map((f) => ({ pregunta: f.question, respuesta: f.answer })),
};

await mkdir("api", { recursive: true });
await writeFile("api/knowledge.json", JSON.stringify(knowledge, null, 2));
console.log(`api/knowledge.json generado: ${services.length} servicios, ${locations.length} sedes, ${promotionsModule.length} promociones, ${faqs.length} FAQs`);
