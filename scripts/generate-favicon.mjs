import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";

// 1. Recortar el simbolo (casita + mascotas) del logo original 3820x2396
const crop = { left: 458, top: 430, width: 964, height: 1137 };

const cropped = await sharp("public/logo-png.png").extract(crop).png().toBuffer();
const icon = await sharp(cropped).trim({ threshold: 10 }).png().toBuffer();

const meta = await sharp(icon).metadata();
const side = Math.max(meta.width, meta.height);
const pad = Math.round(side * 0.08); // margen interno
const square = side + pad * 2;

// Lienzo cuadrado transparente con el icono centrado
const iconSquare = await sharp({
  create: { width: square, height: square, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([{ input: icon, top: pad, left: pad }])
  .png()
  .toBuffer();

await mkdir("public", { recursive: true });

// 2. PNGs del set de favicons
const targets = [
  ["public/favicon-16.png", 16],
  ["public/favicon-32.png", 32],
  ["public/favicon-192.png", 192],
  ["public/favicon-512.png", 512],
];
for (const [file, size] of targets) {
  await sharp(iconSquare).resize(size, size).png().toFile(file);
}

// 3. apple-touch-icon: 180x180 con fondo blanco (iOS no soporta transparencia)
const applePad = Math.round(180 * 0.12);
const appleIcon = await sharp(icon).resize(180 - applePad * 2, 180 - applePad * 2, { fit: "inside" }).png().toBuffer();
await sharp({
  create: { width: 180, height: 180, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
})
  .composite([
    { input: appleIcon, top: Math.round((180 - (await sharp(appleIcon).metadata()).height) / 2), left: Math.round((180 - (await sharp(appleIcon).metadata()).width) / 2) },
  ])
  .png()
  .toFile("public/apple-touch-icon.png");

// 4. favicon.svg: envoltorio con el raster embebido (reemplaza al de Astro)
const pngData = await readFile("public/favicon-512.png");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <image width="512" height="512" href="data:image/png;base64,${pngData.toString("base64")}" />
</svg>`;
await writeFile("public/favicon.svg", svg);

// 5. site.webmanifest
const manifest = {
  name: "Ariel's Clinic - Hospital Veterinario",
  short_name: "Ariel's Clinic",
  icons: [
    { src: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/favicon-512.png", sizes: "512x512", type: "image/png" },
  ],
  theme_color: "#1E3A6E",
  background_color: "#ffffff",
  display: "browser",
};
await writeFile("public/site.webmanifest", JSON.stringify(manifest, null, 2));

console.log("Favicon set generado: 16/32/192/512 + apple-touch-icon + svg + webmanifest");
