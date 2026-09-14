import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SECTIONS = [
  { i: 0,  name: 'hero',         y: 0,     h: 972 },
  { i: 1,  name: 'about',        y: 972,   h: 1200 },
  { i: 2,  name: 'projects',     y: 2172,  h: 2393 },
  { i: 3,  name: 'process',      y: 4565,  h: 1207 },
  { i: 4,  name: 'services',     y: 5772,  h: 1546 },
  { i: 5,  name: 'designcta',    y: 7318,  h: 1076 },
  { i: 6,  name: 'advantages',   y: 8394,  h: 1424 },
  { i: 7,  name: 'products',     y: 9818,  h: 1316 },
  { i: 8,  name: 'testimonials', y: 11134, h: 932 },
  { i: 9,  name: 'blogs',        y: 12066, h: 1647 },
  { i: 10, name: 'footer',       y: 13713, h: 750 },
];

(async () => {
  const src = 'references/pages/home/screenshots/desktop.png';
  const meta = await sharp(src).metadata();
  const H = meta.height!;
  const out = 'references/pages/home/crops/desktop';
  fs.mkdirSync(out, { recursive: true });
  for (const s of SECTIONS) {
    const h = Math.min(s.h, H - s.y);
    if (h <= 0) continue;
    const dest = path.join(out, `${String(s.i).padStart(2, '0')}-${s.name}.png`);
    // escala a 820px de ancho para poder verlo completo
    await sharp(src).extract({ left: 0, top: s.y, width: meta.width!, height: h })
      .resize({ width: 820 }).png({ quality: 90 }).toFile(dest);
    console.log(dest, `(orig 1440x${h})`);
  }
  fs.writeFileSync('references/pages/home/sections.json', JSON.stringify(SECTIONS, null, 2));
})();
