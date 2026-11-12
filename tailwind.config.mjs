/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1E3A6E",
          // deep: variantes más oscuras para TEXTO sobre fondos claros
          // (el naranja/verde/azul de marca no llegan a 4.5:1 de contraste).
          // bright: naranja claro para textos/acento sobre fondo navy.
          orange: { DEFAULT: "#F5821F", deep: "#C2410C", bright: "#FFB25E", vivid: "#E1781D" },
          green: { DEFAULT: "#3E9B6C", deep: "#276749" },
          blue: { DEFAULT: "#4A90D9", deep: "#2B6CB0" },
          surface: "#E9F0FA",
          tint: "#EDF3FC",
          mist: "#EAF1F8",
          ink: "#24364B",
          sky: "#A9CCEA",
        },
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        script: ["Caveat", "cursive"],
      },
      boxShadow: {
        card: "0 18px 45px -24px rgb(19 55 99 / 0.35)",
        hero: "0 28px 70px -30px rgb(20 58 110 / 0.45)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
