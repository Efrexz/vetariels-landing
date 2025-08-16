export default function handler(request, response) {
  // 1. Solo permitir peticiones de tipo POST
  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method Not Allowed" });
  }

  // 2. Extraer los datos que envía el formulario desde el front-end
  const { method, contact } = request.body;

  // 3. Validar que recibimos algo
  if (!method || !contact) {
    return response
      .status(400)
      .json({ message: "Faltan datos en la petición." });
  }

  // 4. ¡Aquí es donde "guardas" la información!
  // Por ahora, solo la mostraremos en los logs de Vercel.
  console.log(`Nueva suscripción recibida:`);
  console.log(`- Método: ${method}`);
  console.log(`- Contacto: ${contact}`);
  console.log("---------------------------");

  // 5. Enviar una respuesta de éxito al front-end
  return response.status(200).json({ message: "¡Suscripción exitosa!" });
}
