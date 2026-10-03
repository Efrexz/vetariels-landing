// promotions:
//   - `sedes` (opcional): lista de sedes donde aplica la promo, ej: ["San Miguel"].
//     Si se omite (o "todas"), la promo se muestra en todas las sedes.
//   - `expirationDate` (opcional): si no se define, el badge de vigencia no se muestra.
//   - Respaldo para el chatbot: api/knowledge.json se regenera con `npm run knowledge:generate`
const promotions = [
  {
    id: "michi-al-dia",
    title: "Plan Michi al Día",
    subtitle: "Cuidamos su salud, porque también son parte de la familia",
    image: "/images/promotions/michiAlDia.webp",
    prices: [
      {
        category: "Precio Promocional",
        details: [
          { type: "Antes", price: "195.00" },
          { type: "Ahora", price: "110.00" },
        ],
      },
    ],
    extraOffer: null,
    includes: [
      "Hemograma",
      "Desparasitación",
      "Antipulgas",
      "Corte de uñas",
      "Vacuna anual (triple felina + rabia)",
    ],
    expirationDate: "30 de Septiembre, 2026",
    dateISO: "2026-09-30",
  },
  {
    id: "guau-al-dia",
    title: "Plan Guau al Día",
    subtitle: "Cuidamos su salud, porque también son parte de la familia",
    image: "/images/promotions/guauAlDia.webp",
    prices: [
      {
        category: "Precio Promocional",
        details: [
          { type: "Antes", price: "270.00" },
          { type: "Ahora", price: "180.00" },
        ],
      },
    ],
    extraOffer: null,
    includes: [
      "Hemograma",
      "Desparasitación",
      "Antipulgas",
      "Corte de uñas",
      "Vacuna anual (séxtuple, rabia y KC)",
    ],
    expirationDate: "30 de Septiembre, 2026",
    dateISO: "2026-09-30",
  },
  {
    id: "jornada-castracion",
    title: "Jornada de Castración y Esterilización",
    subtitle: "Perros y gatos · anestesia inhalatoria",
    image: "/images/promotions/jornadaCastracion.webp",
    prices: [
      {
        category: "Machos",
        details: [
          { type: "Hasta 10 kg", price: "150.00" },
          { type: "11 a 15 kg", price: "200.00" },
        ],
      },
      {
        category: "Hembras",
        details: [
          { type: "Hasta 10 kg", price: "200.00" },
          { type: "11 a 15 kg", price: "250.00" },
        ],
      },
    ],
    extraOffer: null,
    includes: [
      "Hemograma",
      "Bioquímica básica",
      "Cirugía con anestesia inhalatoria",
      "1er día de tratamiento inyectable",
    ],
    conditions: [
      "Dirigido a mascotas de hasta 15 kg / hasta 7 años.",
      "No válido para perros braquicefálicos.",
    ],
    expirationDate: "30 de Septiembre, 2026",
    dateISO: "2026-09-30",
  },
  {
    id: "jornada-profilaxis-dental",
    title: "Jornada de Profilaxis Dental",
    subtitle: "Cuidar su salud bucal es sinónimo de amor",
    image: "/images/promotions/profilaxisDental.webp",
    prices: [
      {
        category: "Perros (hasta 15 kg)",
        details: [{ type: "Precio", price: "200.00" }],
      },
      {
        category: "Gatos",
        details: [{ type: "Precio", price: "150.00" }],
      },
    ],
    extraOffer: null,
    includes: [
      "Hemograma",
      "Bioquímica básica",
      "Procedimiento con anestesia inhalatoria",
      "1er día de tratamiento inyectable (sujeto a evaluación)",
    ],
    conditions: [
      "Dirigido a mascotas de hasta 15 kg / hasta 7 años.",
      "No válido para perros braquicefálicos.",
      "Previa cita.",
    ],
    expirationDate: "30 de Septiembre, 2026",
    dateISO: "2026-09-30",
  },
  {
    id: "bienestar-nutricional",
    title: "Bienestar Nutricional",
    subtitle: "Plan completo de nutrición para tu mascota",
    image: "/images/promotions/bienestarNutricional.webp",
    prices: [
      {
        category: "Precio Promocional",
        details: [
          { type: "Antes", price: "180.00" },
          { type: "Ahora", price: "110.00" },
        ],
      },
    ],
    extraOffer: null,
    includes: [
      "Evaluación clínica completa",
      "Control de peso y condición corporal",
      "Plan nutricional personalizado",
      "Cálculo de requerimiento calórico",
      "1 control de seguimiento",
    ],
    conditions: ["Previa cita."],
    expirationDate: "30 de Septiembre, 2026",
    dateISO: "2026-09-30",
  },
];

export default promotions;
