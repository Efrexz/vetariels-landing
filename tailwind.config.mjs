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
          orange: "#F5821F",
          surface: "#F4F6FA",
          mist: "#EAF1F8",
          ink: "#24364B",
        },
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 45px -24px rgb(19 55 99 / 0.35)",
        hero: "0 28px 70px -30px rgb(20 58 110 / 0.45)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
