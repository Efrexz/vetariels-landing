export interface Promotion {
  id: string;
  discount: string;
  colorBadge: string;
  title: string;
  services: string[];
  expirationDate: string;
  dateISO: string;
}

const promotions: Promotion[] = [
  {
    id: "vacunacion",
    discount: "30%",
    colorBadge: "bg-red-500",
    title: "Paquete de Vacunación",
    services: [
      "Serie completa de vacunas",
      "Examen de salud general",
      "Prevención de parásitos",
      "Consulta nutricional",
    ],
    expirationDate: "31 de Diciembre, 2025",
    dateISO: "2025-12-31",
  },
  {
    id: "cuidado-dental",
    discount: "25%",
    colorBadge: "bg-green-500",
    title: "Especial Cuidado Dental",
    services: [
      "Limpieza dental profesional",
      "Radiografías dentales",
      "Evaluación de salud oral",
      "Instrucciones de cuidado en casa",
    ],
    expirationDate: "15 de Julio, 2025",
    dateISO: "2025-07-15",
  },
  {
    id: "nueva-mascota",
    discount: "40%",
    colorBadge: "bg-blue-500",
    title: "Bienvenida Nueva Mascota",
    services: [
      "Primera consulta gratuita",
      "Vacunas básicas",
      "Desparasitaciones iniciales",
      "Kit de cuidados básicos",
    ],
    expirationDate: "28 de Julio, 2025",
    dateISO: "2025-07-28",
  },
  {
    id: "mascota-senior",
    discount: "20%",
    colorBadge: "bg-purple-500",
    title: "Cuidado Mascota Senior",
    services: [
      "Análisis de sangre completo",
      "Evaluación de salud articular",
      "Exámenes de vista y oído",
      "Plan nutricional personalizado",
    ],
    expirationDate: "31 de Julio, 2025",
    dateISO: "2025-07-31",
  },
];

export default promotions;