import ClinicIcon from "@assets/icons/clinic.png";
import HeartIcon from "@assets/icons/health.png";
import DogSpaIcon from "@assets/icons/dogSpa.png";
import EmergencyIcon from "@assets/icons/emergency.png";
import VeterinarianIcon from "@assets/icons/veterinarian.png";
import ToothIcon from "@assets/icons/tooth.png";
import RxIcon from "@assets/icons/rx.png";
import UltrasoundIcon from "@assets/icons/ultrasound.png";

const servicesData = [
  {
    id: 11,
    icon: UltrasoundIcon,
    title: "Ecografías",
    description:
      "Ofrecemos estudios ecográficos abdominales y gestacionales para evaluar órganos internos y monitorear embarazos. Método no invasivo, ideal para detectar alteraciones en tiempo real sin causar molestias.",
    isSizeSmall: true,
    isFeatured: true,
    imageUrl:
      "https://images.pexels.com/photos/6234614/pexels-photo-6234614.jpeg?_gl=1*11dwvwr*_ga*MzM3NjkxNDk3LjE3NTE4MDY2OTc.*_ga_8JE65Q40S6*czE3NTE4MDY2OTYkbzEkZzEkdDE3NTE4MDY3MzEkajI1JGwwJGgw",
  },
  {
    id: 10,
    icon: RxIcon,
    title: "Radiografías",
    description:
      "Realizamos estudios radiológicos digitales para el diagnóstico preciso de fracturas, cuerpos extraños, enfermedades articulares y otros problemas internos. Tecnología moderna para imágenes claras y rápidas.",
    isSizeSmall: true,
    isFeatured: true,
    imageUrl:
      "https://media.istockphoto.com/id/1196017263/photo/vets-examining-x-ray.jpg?b=1&s=612x612&w=0&k=20&c=ERKsGnKTammrQRPj3cTU_PEw_PRBMG7G1SCZABHbtVA=",
  },
  {
    id: 10,
    icon: EmergencyIcon,
    title: "Emergencias",
    description:
      "Atención veterinaria de emergencias disponible 24/7 para situaciones críticas. Nuestro equipo está preparado para actuar con rapidez y precisión cuando más lo necesitas.",
    isFeatured: true,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661943672478-6161b9ea75cc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 1,
    icon: HeartIcon,
    title: "Vacunación",
    description:
      "Ofrecemos esquemas completos de vacunación para proteger a tu mascota contra enfermedades prevenibles. Aplicamos protocolos actualizados para garantizar su salud y bienestar.",
    includes:
      "Vacunas esenciales, vacunas según estilo de vida, recordatorios de refuerzo",
  },
  {
    id: 2,
    icon: ClinicIcon,
    title: "Cirugía",
    description:
      "Contamos con quirófano equipado con tecnología avanzada para cirugías rutinarias y de emergencia. Nuestro equipo médico garantiza procedimientos seguros y eficientes.",
    includes:
      "Esterilización y castración, cirugía de tejidos blandos, cirugía ortopédica, monitoreo anestésico, cuidados postoperatorios",
  },
  {
    id: 3,
    icon: ToothIcon,
    title: "Cuidado Dental",
    description:
      "Ofrecemos servicios de salud oral veterinaria, con énfasis en la profilaxis dental para prevenir sarro, gingivitis y enfermedades periodontales. También realizamos extracciones, radiografías y cirugías orales cuando es necesario.",
    includes: "Profilaxis, radiografías dentales, extracciones, cirugía oral",
  },
  {
    id: 4,
    icon: EmergencyIcon,
    title: "Hospitalización y Monitoreo",
    description:
      "Ofrecemos un servicio de hospitalización en un ambiente seguro y controlado para mascotas que requieren cuidados continuos, recuperación postoperatoria o tratamiento intensivo.",
    includes:
      "Monitoreo 24/7 de signos vitales, administración de medicamentos y fluidoterapia, manejo del dolor, soporte nutricional especializado, áreas de recuperación cómodas y climatizadas",
  },
  {
    id: 5,
    icon: DogSpaIcon,
    title: "Spa Canino/Felino",
    description:
      "Servicio de spa y grooming profesional enfocado en la higiene, salud y estética de tu mascota. Realizamos baños medicados, cepillado de pelaje, limpieza de oídos y corte de uñas, todo adaptado a su raza y necesidades específicas.",
    includes:
      "Baño, corte de uñas, limpieza de oídos, cepillado, estilizado según raza",
  },
  {
    id: 6,
    icon: VeterinarianIcon,
    title: "Laboratorio",
    description:
      "Contamos con laboratorio clínico veterinario para realizar análisis de sangre, orina, heces y pruebas rápidas. Detectamos infecciones, alteraciones metabólicas y otras condiciones con resultados confiables en poco tiempo.",
    includes:
      "Radiografías, ecografías, análisis de sangre, análisis de orina, pruebas rápidas",
  },
];

export default servicesData;
