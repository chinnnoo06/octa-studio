import sharp from 'sharp';
import fs from 'fs';

/** Para una franja de la página, dice en qué filas se concentra la diferencia. */
const refPath = 'references/pages/home/screenshots/desktop.png';
const genPath = process.argv[2] || '.captures/2/desktop.png';
const refTop = Number(process.argv[3]);
const genTop = Number(process.argv[4]);
const H = Number(process.argv[5]);
const BAND = Number(process.argv[6] || 40);

(async () => {
  const a = await sharp(refPath).extract({ left: 0, top: refTop, width: 1440, height: H }).raw().toBuffer({ resolveWithObject: true });
  const b = await sharp(genPath).extract({ left: 0, top: genTop, width: 1440, height: H }).raw().toBuffer({ resolveWithObject: true });
  const ch = a.info.channels;
  const rows: { y: number; pct: number }[] = [];
  for (let y0 = 0; y0 < H; y0 += BAND) {
    let diff = 0, total = 0;
    for (let y = y0; y < Math.min(y0 + BAND, H); y++) {
      for (let x = 0; x < 1440; x += 2) {
        const i = (y * 1440 + x) * ch;
        const d = Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
        if (d > 30) diff++;
        total++;
      }
    }
    rows.push({ y: y0, pct: total ? (diff / total) * 100 : 0 });
  }
  rows.sort((r, s) => s.pct - r.pct);
  console.log(`franja ref y=${refTop} gen y=${genTop} alto=${H} — bandas de ${BAND}px con más diferencia:`);
  rows.slice(0, 12).forEach((r) => console.log(`  y+${String(r.y).padStart(5)}  ${r.pct.toFixed(1)}% de píxeles distintos`));
})();
