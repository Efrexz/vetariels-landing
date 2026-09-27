import QRCode from "qrcode";
import { mkdir, writeFile } from "node:fs/promises";

const SITE_URL = process.env.SCRIPTS_SITE_URL ?? "https://vetariels-landing.vercel.app";
const target = `${SITE_URL}/#promotions`;

await mkdir("public/qr", { recursive: true });

// SVG vectorial (para imprimir: afiches, stickers, volantes)
const svg = await QRCode.toString(target, {
  type: "svg",
  errorCorrectionLevel: "H",
  margin: 4,
  width: 512,
  color: { dark: "#1E3A6E", light: "#ffffffff" },
});
await writeFile("public/qr/ariels-clinic-promos.svg", svg);

// PNG (para WhatsApp, historias de IG, TikTok)
await QRCode.toFile("public/qr/ariels-clinic-promos.png", target, {
  errorCorrectionLevel: "H",
  margin: 4,
  width: 1024,
  color: { dark: "#1E3A6Eff", light: "#ffffffff" },
});

console.log(`QR generados -> ${target}`);
