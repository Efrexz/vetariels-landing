// Preguntas frecuentes — validar los textos con la clínica antes de publicar
const faqs = [
  {
    id: "sedes",
    question: "¿Dónde están ubicadas sus sedes?",
    answer:
      "Tenemos 3 sedes en Lima: San Miguel (Av. Brígida Silva De Ochoa 272, Urb. Pando), San Martín de Porres (Av. Los Próceres 115) y Los Olivos (Av. Beta Mz Ñ lote 1, urb. Los Olivos 15306). Encuentra mapa, teléfono y horarios en la sección Ubicaciones de esta página.",
  },
  {
    id: "emergencias",
    question: "¿Atienden emergencias de madrugada?",
    answer:
      "Sí. Nuestra sede de San Miguel atiende 24/7 todos los días del año, incluyendo emergencias de madrugada. Si tu mascota presenta una urgencia, llámanos o escríbenos por WhatsApp al +51 954 599 221.",
  },
  {
    id: "cita",
    question: "¿Cómo agendo una cita?",
    answer:
      "Escríbenos por WhatsApp a la sede de tu preferencia y nuestro equipo te coordinará la cita más cercana. También puedes llamarnos directamente a los teléfonos de cada sede. Ten en cuenta que toda atención es por orden de llegada.",
  },
  {
    id: "vacunas",
    question: "¿Qué vacunas necesita mi mascota?",
    answer:
      "Depende de la especie, edad y estilo de vida. Aplicamos esquemas completos y protocolos actualizados: vacunas esenciales y de acuerdo al estilo de vida de tu mascota, con recordatorios de refuerzo. En consulta te armamos el plan exacto para tu peludo.",
  },
  {
    id: "esterilizacion",
    question: "¿A qué edad puedo esterilizar a mi mascota?",
    answer:
      "Depende de la especie, raza y tamaño. Somos cautos: recomendamos una consulta previa para evaluar a tu mascota. En Ariel's Clinic realizamos esterilizaciones y cirugías con quirófano equipado y monitoreo anestésico completo.",
  },
  {
    id: "laboratorio",
    question: "¿Los análisis y radiografías se hacen el mismo día?",
    answer:
      "Sí. Contamos con laboratorio clínico (sangre, orina, heces y pruebas rápidas), radiología digital y ecografías para un diagnóstico en el menor tiempo posible. Los resultados se entregan el mismo día en la mayoría de casos.",
  },
  {
    id: "hospitalizacion",
    question: "¿Qué pasa si mi mascota necesita quedarse internada?",
    answer:
      "El internamiento se realiza en nuestra sede de San Miguel, con monitoreo 24/7 de signos vitales, fluidoterapia, manejo del dolor y soporte nutricional. Si tu mascota está siendo atendida en otra sede, no te preocupes: nosotros nos encargamos del traslado del paciente. Te mantenemos informado durante toda la estadía.",
  },
  {
    id: "spa",
    question: "¿El spa canino/felino incluye corte según raza?",
    answer:
      "Sí. Nuestro servicio de spa incluye baño medicado o convencional, secado, cepillado, deslanado, estilizado y corte según raza, además de limpieza de oídos y almohadillas con productos adaptados al pelaje de tu mascota.",
  },
  {
    id: "pago",
    question: "¿Qué formas de pago aceptan?",
    answer:
      "Aceptamos todos los medios de pago: efectivo, tarjeta y transferencias (Yape/Plin). En promociones y campañas el pago suele realizarse con efectivo, Yape, Plin o transferencia; igualmente puedes consultar en el counter. Si pagas con tarjeta de crédito, se requiere presentar el DNI del titular y que esté presente en el momento del pago.",
  },
  {
    id: "promos",
    question: "¿Cómo me entero de las promociones vigentes?",
    answer:
      "Las campañas vigentes están siempre en la sección Promociones de esta página, y también las anunciamos en nuestras redes sociales: Instagram (@arielsclinichospital), Facebook (Ariels Clinic) y TikTok (@arielsclinichospital). También puedes suscribirte a nuestro boletín al final de la página para recibir promociones y consejos de cuidado por correo o WhatsApp.",
  },
  {
    id: "especialistas",
    question: "¿Atienden consultas con especialistas?",
    answer:
      "Sí. Contamos con consultas especializadas en dermatología, cardiología, neurología, oncología, odontología y neumología. Son de pago previo y el día y la hora se coordinan directamente con el especialista según su disponibilidad. Escríbenos por WhatsApp para coordinar tu cita de especialidad.",
  },
  {
    id: "grooming-agenda",
    question: "¿Cómo agendo un baño o grooming para mi mascota?",
    answer:
      "Tienes dos opciones: acercarte directamente a la clínica (toda atención es por orden de llegada; te recomendamos venir desde las 9 AM, cuando inicia nuestra área de grooming) o coordinar el servicio con nuestra movilidad a través de nuestra página de agenda de grooming. El costo del baño depende del peso, el tipo de pelaje y si la mascota cuenta con motas, y se confirma al momento de llegar con la mascota; por WhatsApp te pueden dar un costo aproximado.",
  },
];

export default faqs;
