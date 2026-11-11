import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
// Tailwind v3 se carga vía PostCSS (postcss.config.mjs). La integración
// @astrojs/tailwind quedó obsoleta: no soporta Astro 7.
// El diseño no cambia: tailwind.config.mjs y las clases siguen igual.

const site =
  process.env.PUBLIC_SITE_URL ?? "https://vetariels-landing.vercel.app";

export default defineConfig({
  site,
  integrations: [sitemap()],
  vite: {
    resolve: {
      alias: {
        "@components": "/src/components",
        "@assets": "/src/assets",
        "@layouts": "/src/layouts",
        "@data": "/src/data",
      },
    },
  },
});
