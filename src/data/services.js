import ClinicIcon from "@assets/icons/clinic.png";
import HeartIcon from "@assets/icons/health.png";
import DogSpaIcon from "@assets/icons/dogSpa.png";
import EmergencyIcon from "@assets/icons/emergency.png";
import VeterinarianIcon from "@assets/icons/veterinarian.png";
import ToothIcon from "@assets/icons/tooth.png";

const servicesData = [
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
    icon: DogSpaIcon,
    title: "Grooming",
    description:
      "Servicios profesionales de grooming para mantener a tu mascota limpia y con un aspecto impecable. Desde baños básicos hasta estilizado según raza y tipo de pelaje.",
    includes:
      "Baño, corte de uñas, limpieza de oídos, cepillado, estilizado según raza",
  },
  {
    id: 4,
    icon: ToothIcon,
    title: "Cuidado Dental",
    description:
      "Servicios dentales integrales que incluyen limpieza, extracciones y mantenimiento de la salud oral para prevenir enfermedades y molestias.",
    includes: "Limpieza, radiografías, extracciones, cirugía oral",
  },
  {
    id: 5,
    icon: EmergencyIcon,
    title: "Emergencias",
    description:
      "Atención veterinaria de emergencias disponible 24/7 para situaciones críticas. Nuestro equipo está preparado para actuar con rapidez y precisión cuando más lo necesitas.",
    includes:
      "Atención inmediata, traumas, intoxicaciones, monitoreo intensivo, soporte vital",
  },
  {
    id: 6,
    icon: VeterinarianIcon,
    title: "Diagnóstico",
    description:
      "Realizamos una evaluación integral para detectar problemas de salud de forma temprana. Nuestro enfoque diagnóstico permite tomar decisiones clínicas precisas.",
    includes:
      "Radiografías, ecografías, análisis de sangre, análisis de orina, pruebas rápidas",
  },
];

export default servicesData;
