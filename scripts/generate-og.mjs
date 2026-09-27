import sharp from "sharp";
import sharpMod from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const NAVY = "#1E3A6E";
const ORANGE = "#F5821F";

const card = {
  x: 340,
  y: 105,
  w: 520,
  h: 420,
  rx: 48,
};

const logoWidth = 440;
const logoHeight = Math.round((logoWidth * 2396) / 3820); // logo-png.png aspect
const logoX = Math.round(card.x + (card.w - logoWidth) / 2);
const logoY = Math.round(card.y + (card.h - logoHeight) / 2);

const shapesSvg = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${NAVY}" />
  <rect x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" rx="${card.rx}" fill="#ffffff" />
  <rect x="0" y="${HEIGHT - 16}" width="${WIDTH}" height="16" fill="${ORANGE}" />
  <circle cx="96" cy="96" r="10" fill="${ORANGE}" opacity="0.9" />
  <circle cx="1104" cy="534" r="14" fill="${ORANGE}" opacity="0.7" />
  <circle cx="1130" cy="96" r="7" fill="#ffffff" opacity="0.45" />
  <circle cx="70" cy="534" r="7" fill="#ffffff" opacity="0.35" />
</svg>
`);

await sharp({
  create: { width: WIDTH, height: HEIGHT, channels: 4, background: { r: 30, g: 58, b: 110, alpha: 1 } },
})
  .composite([
    { input: shapesSvg, top: 0, left: 0 },
    ...(await sharpMod("public/logo-png.png").flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } }).resize(logoWidth, logoHeight, { fit: "contain" }).png().toBuffer().then((buf) => [{ input: buf, top: logoY, left: logoX }])),
  ])
  .png()
  .jpeg({ quality: 92 })
  .toFile("public/og-image.png");

console.log("og-image.png + og-image.jpg listos");
