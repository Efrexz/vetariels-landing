// promotions:
//   - `sedes` (opcional): lista de sedes donde aplica la promo, ej: ["San Miguel"].
//     Si se omite (o "todas"), la promo se muestra en todas las sedes.
//   - Respaldo para el chatbot: api/knowledge.json se regenera con `npm run knowledge:generate`
const promotions = [
  {
    id: "salud-integral",
    title: "Campaña Salud Integral",
    subtitle: "Chequeo Veterinario",
    image: "/images/promotions/saludIntegral.webp",
    prices: [
      {
        category: "Precio Promocional",
        details: [
          { type: "Antes", price: "500.00" },
          { type: "Ahora", price: "180.00" },
        ],
      },
    ],
    extraOffer: null,
    includes: [
      "Consulta médica veterinaria",
      "Hemograma automatizado",
      "Perfil hepático y renal",
      "Medición de glucosa y presión",
      "Radiografía de tórax",
    ],
    expirationDate: "31 de Agosto, 2025",
    dateISO: "2025-08-31",
  },
  {
    id: "esterilizacion-agosto",
    title: "Campaña de Esterilización y Castración",
    subtitle: "Promoción Mes de Agosto",
    image: "/images/promotions/castracion.webp",
    prices: [
      {
        category: "Felinos",
        details: [
          { type: "Machos", price: "65.00" },
          { type: "Hembras", price: "85.00" },
        ],
      },
      {
        category: "Caninos",
        details: [
          { type: "Machos", price: "80.00" },
          { type: "Hembras", price: "120.00" },
        ],
      },
    ],
    extraOffer: {
      title: "Exámenes básicos",
      price: "30.00",
    },
    conditions: [
      "Dirigido a mascotas menores de 7 años.",
      "Con peso menor de 15 kg.",
    ],
    expirationDate: "31 de Agosto, 2025",
    dateISO: "2025-08-31",
  },
  {
    id: "salud-dermatologica",
    title: "Campaña Salud Dermatológica",
    subtitle: "Consulta y evaluación completa de piel y pelaje",
    image: "/images/promotions/dermatologia.webp",
    prices: [
      {
        category: "Precio Promocional",
        details: [
          { type: "Antes", price: "170.00" },
          { type: "Ahora", price: "90.00" },
        ],
      },
    ],
    extraOffer: null,
    includes: [
      "Consulta dermatológica",
      "Evaluación completa de piel y pelaje",
      "Prueba de raspado cutáneo (parásitos/infecciones)",
      "Plan de tratamiento y cuidado dermatológico",
      "Revisión de oídos",
      "Recomendaciones de shampoos y productos adecuados",
    ],
    expirationDate: "31 de Agosto, 2025",
    dateISO: "2025-08-31",
  },
  {
    id: "profilaxis-dental-agosto",
    title: "Profilaxis Dental",
    subtitle: "Cuidar su salud bucal es sinónimo de amor",
    image: "/images/promotions/profilaxis.webp",
    prices: [
      {
        category: "Precio Promocional",
        details: [{ type: "Cupos Limitados", price: "100.00" }],
      },
    ],
    extraOffer: null,
    conditions: [
      "Dirigido a mascotas menores de 7 años.",
      "Con peso menor de 15 kg.",
      "Consulta con previa cita.",
      "El precio NO incluye extracción dental.",
      "Medios de Pago: Yape, Plin y Transferencia.",
    ],
    expirationDate: "31 de Agosto, 2025",
    dateISO: "2025-08-31",
  },
  {
    id: "esterilizacion-agosto",
    title: "Campaña de Esterilización y Castración",
    subtitle: "Promoción Mes de Agosto",
    image: "/images/promotions/castracion.webp",
    prices: [
      {
        category: "Felinos",
        details: [
          { type: "Machos", price: "65.00" },
          { type: "Hembras", price: "85.00" },
        ],
      },
      {
        category: "Caninos",
        details: [
          { type: "Machos", price: "80.00" },
          { type: "Hembras", price: "120.00" },
        ],
      },
    ],
    extraOffer: {
      title: "Exámenes básicos",
      price: "30.00",
    },
    conditions: [
      "Dirigido a mascotas menores de 7 años.",
      "Con peso menor de 15 kg.",
    ],
    expirationDate: "31 de Agosto, 2025",
    dateISO: "2025-08-31",
  },
  {
    id: "esterilizacion-agosto",
    title: "Campaña de Esterilización y Castración",
    subtitle: "Promoción Mes de Agosto",
    image: "/images/promotions/castracion.webp",
    prices: [
      {
        category: "Felinos",
        details: [
          { type: "Machos", price: "65.00" },
          { type: "Hembras", price: "85.00" },
        ],
      },
      {
        category: "Caninos",
        details: [
          { type: "Machos", price: "80.00" },
          { type: "Hembras", price: "120.00" },
        ],
      },
    ],
    extraOffer: {
      title: "Exámenes básicos",
      price: "30.00",
    },
    conditions: [
      "Dirigido a mascotas menores de 7 años.",
      "Con peso menor de 15 kg.",
    ],
    expirationDate: "31 de Agosto, 2025",
    dateISO: "2025-08-31",
  },
];

export default promotions;
