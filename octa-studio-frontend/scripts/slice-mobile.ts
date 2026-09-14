import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
(async () => {
  for (const vp of ['mobile', 'tablet']) {
    const src = `references/pages/home/screenshots/${vp}.png`;
    const meta = await sharp(src).metadata();
    const out = `references/pages/home/crops/${vp}`;
    fs.mkdirSync(out, { recursive: true });
    const CH = vp === 'mobile' ? 1100 : 1400;
    const n = Math.ceil(meta.height! / CH);
    for (let i = 0; i < n; i++) {
      const top = i * CH;
      const h = Math.min(CH, meta.height! - top);
      if (h < 30) continue;
      const dest = path.join(out, `${String(i).padStart(2, '0')}-y${top}.png`);
      await sharp(src).extract({ left: 0, top, width: meta.width!, height: h })
        .resize({ width: vp === 'mobile' ? 375 : 640 }).png().toFile(dest);
    }
    console.log(vp, '->', n, 'chunks de', CH, 'px');
  }
})();
