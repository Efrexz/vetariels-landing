// promotions:
//   - `sedes` (opcional): lista de sedes donde aplica la promo, ej: ["San Miguel"].
//     Si se omite (o "todas"), la promo se muestra en todas las sedes.
//   - `dateISO` + `expirationDate`: vigencia; el knowledge del chatbot filtra promos
//     expiradas automáticamente (npm run knowledge:generate).
//   - Respaldo para el chatbot: api/knowledge.json se regenera con `npm run knowledge:generate`
const promotions = [
  {
    id: "bienestar-senior",
    title: "Bienestar Senior",
    subtitle: "Check-up geriátrico a partir de los 7 años",
    image: "/images/promotions/senior.webp",
    prices: [
      {
        category: "Precio Promocional",
        details: [
          { type: "Antes", price: "640.00" },
          { type: "Ahora", price: "399.00" },
        ],
      },
    ],
    extraOffer: null,
    includes: [
      "Hemograma",
      "Perfil hepático y renal",
      "Radiografía de tórax o electrocardiograma",
      "Medición de glucosa y presión arterial",
      "TFAS y AFAST",
      "Urianálisis",
    ],
    conditions: [
      "Dirigido a mascotas a partir de los 7 años.",
      "El paquete es válido pasando una consulta.",
      "La consulta médica no está incluida en el paquete.",
    ],
    expirationDate: "31 de Octubre, 2026",
    dateISO: "2026-10-31",
  },
  {
    id: "bienestar-integral",
    title: "Bienestar Integral",
    subtitle: "Perfil general de salud para perros y gatos",
    image: "/images/promotions/integral.webp",
    prices: [
      {
        category: "Precio Promocional",
        details: [
          { type: "Antes", price: "420.00" },
          { type: "Ahora", price: "220.00" },
        ],
      },
    ],
    extraOffer: null,
    includes: [
      "Hemograma",
      "Bioquímica sanguínea básica",
      "Urianálisis",
      "TFAS y AFAST",
    ],
    conditions: [
      "El paquete es válido pasando una consulta.",
      "La consulta médica no está incluida en el paquete.",
    ],
    expirationDate: "31 de Octubre, 2026",
    dateISO: "2026-10-31",
  },
  {
    id: "primeros-pasitos",
    title: "Primeros Pasitos",
    subtitle: "Kit de bienvenida para gatitos y perritos desde los 2 meses",
    image: "/images/promotions/primerosPasitos.webp",
    prices: [
      {
        category: "Precio Promocional",
        details: [
          { type: "Antes", price: "290.00" },
          { type: "Ahora", price: "169.00" },
        ],
      },
    ],
    extraOffer: null,
    includes: [
      "Consulta médica",
      "Hemograma",
      "Examen coproparasitológico completo",
      "3 días de desparasitación (se aplica después del resultado del examen)",
      "Primera vacuna (cuádruple o triple felina)",
      "Churu para gatito o perrito",
    ],
    conditions: [
      "Dirigido a cachorros a partir de los 2 meses.",
    ],
    expirationDate: "31 de Octubre, 2026",
    dateISO: "2026-10-31",
  },
];

export default promotions;
