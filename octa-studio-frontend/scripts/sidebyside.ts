import sharp from 'sharp';
import fs from 'fs';

/** Pone referencia y réplica una al lado de otra para inspección visual. */
const refPath = process.argv[2];
const genPath = process.argv[3];
const out = process.argv[4] || '.captures/compare.png';
const refTop = Number(process.argv[5] || 0);
const refH = Number(process.argv[6] || 0);
const genTop = Number(process.argv[7] || 0);
const genH = Number(process.argv[8] || 0);
const W = Number(process.argv[9] || 620);

(async () => {
  const mk = async (p: string, top: number, h: number) => {
    const m = await sharp(p).metadata();
    const height = h || m.height! - top;
    return sharp(p)
      .extract({ left: 0, top, width: m.width!, height: Math.min(height, m.height! - top) })
      .resize({ width: W })
      .toBuffer({ resolveWithObject: true });
  };
  const a = await mk(refPath, refTop, refH);
  const b = await mk(genPath, genTop, genH);
  const H = Math.max(a.info.height, b.info.height);
  fs.mkdirSync(out.substring(0, out.lastIndexOf('/')) || '.', { recursive: true });
  await sharp({ create: { width: W * 2 + 12, height: H, channels: 3, background: { r: 255, g: 0, b: 128 } } })
    .composite([
      { input: a.data, top: 0, left: 0 },
      { input: b.data, top: 0, left: W + 12 },
    ])
    .png()
    .toFile(out);
  console.log(`${out}  ref ${a.info.width}x${a.info.height} | gen ${b.info.width}x${b.info.height}`);
})();
