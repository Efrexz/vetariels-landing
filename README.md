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

## 📣 Marketing y difusión

- **QR de campañas:** `public/qr/ariels-clinic-promos.png` (para redes/WhatsApp) y `.svg` (para imprimir). Apunta a la página con las promociones vigentes (`/#promotions`), así que el QR impreso nunca caduca: la página siempre muestra lo actual. Si cambia el dominio, regenera con `npm run qr:generate`.
- **Previews al compartir (OG tags):** se configuran en `src/layouts/Layout.astro` con la imagen `public/og-image.jpg`. Para regenerarla tras cambiar el logo: `npm run assets:generate`.
- **Variables de entorno** (en `.env` local o en las variables de Vercel):
  - `PUBLIC_SITE_URL`: URL base del sitio; la usan los OG tags, el QR y el schema de Google. Al comprar el dominio propio solo se actualiza aquí.
  - `PUBLIC_GA_ID` (opcional): ID de medición de GA4. **Sin configurarla, el sitio no carga ningún script de analítica.** Al configurarla, se registran clics en WhatsApp (con sede de origen) y envíos del newsletter.

## Contacto

- 📩 **Email:** efrexz448@gmail.com
- 💼 **Linkedin:** https://www.linkedin.com/in/efrainandrade-dev/

---

**¡Gracias por visitar la Landing Page de Veterinaria Ariels Clinic! 🐾**
