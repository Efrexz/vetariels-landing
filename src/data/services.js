import { ScanLine, Radiation, Siren, Syringe, BriefcaseMedical, Sparkles, Hospital, Dog, FlaskConical } from "@lucide/astro";

const servicesData = [
  {
    id: "ecografias",
    icon: ScanLine,
    title: "Ecografías",
    tagline: "Diagnóstico preciso",
    description:
      "Ofrecemos estudios ecográficos abdominales y gestacionales para evaluar órganos internos y monitorear embarazos. Método no invasivo, ideal para detectar alteraciones en tiempo real sin causar molestias.",
    imageUrl:
      "https://images.pexels.com/photos/6234614/pexels-photo-6234614.jpeg?_gl=1*11dwvwr*_ga*MzM3NjkxNDk3LjE3NTE4MDY2OTc.*_ga_8JE65Q40S6*czE3NTE4MDY2OTYkbzEkZzEkdDE3NTE4MDY3MzEkajI1JGwwJGgw",
    isFeatured: true,
  },
  {
    id: "radiografias",
    icon: Radiation,
    title: "Radiografías",
    tagline: "Imágenes que cuidan",
    description:
      "Realizamos estudios radiológicos digitales para el diagnóstico preciso de fracturas, cuerpos extraños, enfermedades articulares y otros problemas internos. Tecnología moderna para imágenes claras y rápidas.",
    imageUrl:
      "https://media.istockphoto.com/id/1196017263/photo/vets-examining-x-ray.jpg?b=1&s=612x612&w=0&k=20&c=ERKsGnKTammrQRPj3cTU_PEw_PRBMG7G1SCZABHbtVA=",
    isFeatured: true,
  },
  {
    id: "emergencias",
    icon: Siren,
    title: "Emergencias 24/7",
    tagline: "Atención inmediata 24/7",
    description:
      "Atención veterinaria de emergencias disponible 24/7 para situaciones críticas. Nuestro equipo está preparado para actuar con rapidez y precisión cuando más lo necesitas.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661943672478-6161b9ea75cc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isFeatured: true,
  },
  {
    id: "vacunacion",
    icon: Syringe,
    title: "Vacunación",
    accent: "rose",
    description:
      "Ofrecemos esquemas completos de vacunación para proteger a tu mascota contra enfermedades prevenibles. Aplicamos protocolos actualizados para garantizar su salud y bienestar.",
    items: [
      "Vacunas esenciales",
      "Vacunas según estilo de vida",
      "Recordatorios de refuerzo",
    ],
  },
  {
    id: "cirugia",
    icon: BriefcaseMedical,
    title: "Cirugía",
    accent: "sky",
    description:
      "Contamos con quirófano equipado con tecnología avanzada para cirugías rutinarias y de emergencia. Nuestro equipo médico garantiza procedimientos seguros y eficientes.",
    items: [
      "Esterilización y castración",
      "Cirugía de tejidos blandos",
      "Cirugía ortopédica",
      "Monitoreo anestésico",
      "Cuidados postoperatorios",
    ],
  },
  {
    id: "dental",
    icon: Sparkles,
    title: "Cuidado Dental",
    accent: "emerald",
    description:
      "Servicios de salud oral veterinaria con énfasis en profilaxis dental para prevenir sarro, gingivitis y enfermedades periodontales. También realizamos extracciones, radiografías y cirugías orales.",
    items: [
      "Profilaxis",
      "Radiografías dentales",
      "Extracciones",
      "Cirugía oral",
    ],
  },
  {
    id: "hospitalizacion",
    icon: Hospital,
    title: "Hospitalización y Monitoreo",
    accent: "orange",
    description:
      "Servicio de hospitalización en un ambiente seguro y controlado para mascotas que requieren cuidados continuos, recuperación postoperatoria o tratamiento intensivo.",
    items: [
      "Monitoreo 24/7 de signos vitales",
      "Fluidoterapia y medicamentos",
      "Manejo del dolor",
      "Soporte nutricional especializado",
    ],
  },
  {
    id: "spa",
    icon: Dog,
    title: "Spa Canino/Felino",
    accent: "purple",
    description:
      "Servicio integral de spa y grooming profesional para perros y gatos, enfocado en la higiene, salud y estética. Incluye técnicas especializadas y productos adaptados a cada raza.",
    items: [
      "Baños medicados",
      "Cepillado y deslanado",
      "Estilizado y corte según raza",
      "Limpieza de oídos y almohadillas",
    ],
  },
  {
    id: "laboratorio",
    icon: FlaskConical,
    title: "Laboratorio",
    accent: "amber",
    description:
      "Contamos con laboratorio clínico veterinario para realizar análisis de sangre, orina, heces y pruebas rápidas. Detectamos infecciones, alteraciones metabólicas y otras condiciones con resultados confiables.",
    items: [
      "Análisis de sangre",
      "Análisis de orina y heces",
      "Pruebas rápidas",
      "Resultados confiables en poco tiempo",
    ],
  },
];

export default servicesData;
