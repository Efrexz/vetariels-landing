import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

const site =
  process.env.PUBLIC_SITE_URL ?? "https://vetariels-landing.vercel.app";

export default defineConfig({
  site,
  integrations: [tailwind(), sitemap()],
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
