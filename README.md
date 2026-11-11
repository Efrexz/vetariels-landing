# Veterinaria Ariels Clinic - Landing Page

## Descripción

Este proyecto es una landing page moderna y responsiva diseñada para la clínica veterinaria Ariels Clinic. El objetivo principal es establecer una presencia online para la veterinaria, proporcionando a los clientes potenciales y existentes una forma accesible y atractiva de conocer los servicios que ofrecemos, el equipo médico, la información de contacto y las ubicaciones de nuestras sedes.

## ¿Por qué este proyecto?

Creé esta landing page con el fin de ayudar a la veterinaria Ariels Clinic a expandir su alcance y mejorar su visibilidad en el entorno digital. Mi motivación fue aplicar mis habilidades de desarrollo web para crear una solución práctica que resolviera una necesidad real del negocio: tener una plataforma centralizada para mostrar su oferta de valor y facilitar la comunicación con sus clientes. Este proyecto me permitió trabajar en un caso de uso real, desde el diseño hasta la implementación, enfocándome en la usabilidad y la presentación de información clave.

## Características principales

- 🐾 **Servicios completos:** Detalle de todos los servicios veterinarios ofrecidos.
- 👨‍⚕️ **Nuestro equipo:** Presentación del equipo médico con sus especialidades.
- 📱 **Contacto fácil:** Múltiples formas de contacto, incluyendo teléfono y redes sociales.
- 📍 **Sedes disponibles:** Información y ubicación de las diferentes sucursales.
- ✨ **Diseño responsivo:** Adaptable a cualquier dispositivo (móvil, tablet, escritorio).

## Tecnologías utilizadas

- **Astro**
- **Tailwind CSS**
- **JavaScript**

## 🚀 Demo en vivo

👉 **Prueba la aplicación aquí:** https://vetariels-landing.vercel.app/

## Instalación y ejecución

1. Clona el repositorio:

```
git clone https://github.com/Efrexz/vetariels-landing.git
```

2. Ingresa al directorio del proyecto:

```
cd vetariels-landing
```

3. Instala las dependencias:

```
npm install
```

4. Inicia el servidor de desarrollo:

```
npm run dev
```

## Próximas mejoras

- 📅 **Sistema de agendamiento de citas:** Permitir a los usuarios reservar citas directamente desde la página.
- 💬 **Chat en vivo:** Implementar un chat para soporte y consultas rápidas.
- 🖼️ **Galería de casos de éxito/pacientes:** Mostrar fotos de mascotas y testimonios.

## ✅ Pendientes / TODO

- [ ] **🔴 Pendiente (no olvidar):** cuando la página esté online y al público, activar **Upstash Redis** en Vercel (Storage → Create Database → Upstash → conectar al proyecto → redeploy). Ver detalle en la sección del chatbot arriba. Sin esto, el límite del chat funciona "en memoria" (menos fiable contra abuso). *Aplazado voluntariamente mientras la página no es pública.*
- [x] ~~Fase 3: actualizar la política de privacidad (Formspree + proveedor de IA + uso del contacto para promos por WhatsApp) y aviso en el chat.~~ ✅ Hecho (2026-11-11).
- [ ] Fase 4: actualizar Astro/dependencias (incluye avisos de `npm audit`) con pruebas del chat y de la página.
- [ ] Mejoras UX aplazadas: alternativa visible si el mapa falla, contraste de colores de marca, navegación desde la página de privacidad, conflicto entre los botones flotantes, contenido visible sin JavaScript.
- [ ] Verificar con la clínica horarios, teléfonos, precios y datos de contacto vigentes.

## 📣 Marketing y difusión

- **QR de campañas:** `public/qr/ariels-clinic-promos.png` (para redes/WhatsApp) y `.svg` (para imprimir). Apunta a la página con las promociones vigentes (`/#promotions`), así que el QR impreso nunca caduca: la página siempre muestra lo actual. Si cambia el dominio, regenera con `npm run qr:generate`.
- **Previews al compartir (OG tags):** se configuran en `src/layouts/Layout.astro` con la imagen `public/og-image.jpg`. Para regenerarla tras cambiar el logo: `npm run assets:generate`.
- **Variables de entorno** (en `.env` local o en las variables de Vercel):
  - `PUBLIC_SITE_URL`: URL base del sitio; la usan los OG tags, el QR y el schema de Google. Al comprar el dominio propio solo se actualiza aquí.
  - `PUBLIC_GA_ID` (opcional): ID de medición de GA4. **Sin configurarla, el sitio no carga ningún script de analítica.** Al configurarla, se registran clics en WhatsApp (con sede de origen) y envíos del newsletter.
  - `PUBLIC_GSC_VERIFICATION` (opcional): código de verificación de Google Search Console.

## 🔍 SEO

- **Sitemap y robots:** `@astrojs/sitemap` genera `sitemap-index.xml` en cada build; `public/robots.txt` lo referencia. Al registrar el sitio en [Google Search Console](https://search.google.com/search-console), envía ese sitemap.
- **Datos estructurados:** JSON-LD de `Organization`, `VeterinaryCare` por cada sede (dirección, geo, horarios, teléfono) y `AggregateRating` con las reseñas de Google.
- **Favicon:** set completo generado desde el logo (`scripts/generate-favicon.mjs` → `npm run favicon:generate`). Si algún día tienen el SVG oficial del ícono, reemplazar `public/favicon.svg` y regenerar.

## 🤖 Asistente virtual (chatbot)

Asistente con OpenRouter (modelo DeepSeek Flash prepagado). Respuestas limitadas a información de la clínica; ante dudas médicas deriva a WhatsApp o emergencias 24/7.

- **Frontend:** `src/components/Chatbot.astro` (botón flotante junto al de WhatsApp).
- **Backend:** `api/chat.js` (serverless de Vercel) — la API key NUNCA está en el frontend. Cadena: OpenRouter pagado (2 intentos) → variante `:free` de OpenRouter → WhatsApp. **Gemini fue retirado** (sus cuotas free generaban más errores que respaldo).
- **Conocimiento:** `api/knowledge.json` — se regenera con `npm run knowledge:generate` desde los datos de la página (servicios, sedes, promociones, FAQs). Las promociones vencidas se filtran automáticamente **en la web y en cada consulta del chat** (campo `dateISO`), aunque la copia esté desactualizada.
- **Configuración en Vercel:** `OPENROUTER_API_KEY` en las variables de entorno. Sin key, el endpoint responde 503 y el chat siempre sugiere WhatsApp. **La key es prepagada (sin recarga automática): techo de gasto duro.**
- **Límite de solicitudes (Upstash):** crear en Vercel → tu proyecto → **Storage** → *Create Database* → **Upstash Redis** y conectarlo al proyecto; Vercel agrega solo `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`. Con esto el límite es real y distribuido: ~10 mensajes/hora por IP (`MAX_REQUESTS_PER_HOUR`) y tope global diario de 100 consultas (`CHAT_DAILY_LIMIT`) para proteger el presupuesto. **Sin Upstash el límite funciona "en memoria"** (menos fiable contra bots: cada instancia serverless cuenta por separado).
- **Otras protecciones:** presupuesto total de respuesta de 18 s (el navegador cancela a los 25 s), timeout por llamada de 8 s, `sede` validada contra lista cerrada (texto libre del usuario nunca entra al prompt), historial validado (payloads malformados no tumban el endpoint), respuestas cortas (`maxOutputTokens` 700), 12→10 mensajes/hora por IP, historial corto por petición. Cada caso (demanda, cuota, key inválida) tiene su propio mensaje en el frontend.
- **Configuración opcional:** `OPENROUTER_MODEL_PAID` y `OPENROUTER_MODEL_FREE` para cambiar de modelo sin tocar código. Al cambiar servicios/promociones/FAQs, regenerar conocimiento con `npm run knowledge:generate`.

## Contacto

- 📩 **Email:** efrexz448@gmail.com
- 💼 **Linkedin:** https://www.linkedin.com/in/efrainandrade-dev/

---

**¡Gracias por visitar la Landing Page de Veterinaria Ariels Clinic! 🐾**
