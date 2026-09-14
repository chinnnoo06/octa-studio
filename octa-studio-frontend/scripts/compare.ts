import { chromium, type Browser } from 'playwright';
import sharp from 'sharp';
import type { OutputInfo } from 'sharp';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'fs';
import path from 'path';
import { BROWSER_CONTEXT_OPTIONS, VIEWPORTS, waitForContent, installNameShim } from './capture-clean';
import { captureStitched } from './capture-stitch';

const PAGE = process.env.PAGE_NAME || 'home';
const ROUTE = process.env.ROUTE || '/';
const ITER = process.env.ITER || '1';
const BASE = process.env.BASE_URL || 'http://localhost:3000';

const REF_DIR = path.join('references', 'pages', PAGE, 'screenshots');
const OUT_DIR = path.join('.captures', ITER);
const DIFF_DIR = path.join('references', 'iterations', ITER);

interface SectionBox { name: string; y: number; h: number }

/**
 * Franjas ocupadas por marquees, en offset relativo al inicio de la sección.
 *
 * Comparar píxeles sobre un bucle infinito no mide fidelidad: mide en qué fase
 * estaba cada captura. Se puntúan aparte para que el score refleje el diseño y
 * no el azar del instante de captura. Los valores son fracciones del alto de la
 * sección, así que valen igual en los tres breakpoints.
 */
const ANIMATED_BANDS: Record<string, [number, number][]> = {
  hero: [[0.55, 1]],       // tira de imágenes
  services: [[0.8, 1]],    // marquee de texto de 2 filas
  offers: [[0, 1]],        // la sección entera es un marquee
  advantages: [[0.15, 0.4]], // anillo giratorio + slot machine del badge
};

/** Mide los bbox de las secciones de la RÉPLICA leyendo los data-section del DOM. */
async function measureReplicaSections(browser: Browser, width: number, height: number) {
  const ctx = await browser.newContext({ ...BROWSER_CONTEXT_OPTIONS, viewport: { width, height } });
  const page = await ctx.newPage();
  await installNameShim(page);
  await page.goto(BASE + ROUTE, { waitUntil: 'networkidle', timeout: 60000 });
  await waitForContent(page);
  const boxes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[data-section]')).map((el) => {
      const r = el.getBoundingClientRect();
      return {
        name: el.getAttribute('data-section')!,
        y: Math.round(r.y + window.scrollY),
        h: Math.round(r.height),
      };
    });
  });
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  await ctx.close();
  return { boxes: boxes as SectionBox[], total };
}

/** pixelmatch + un SSIM global barato sobre dos crops ya normalizados. */
async function compareCrops(
  refPath: string,
  genPath: string,
  diffPath: string,
  maskBands?: [number, number][]
) {
  const NORM_W = 1000;
  const [refMeta, genMeta] = await Promise.all([sharp(refPath).metadata(), sharp(genPath).metadata()]);
  // Normalizar al mismo ancho y al menor alto proporcional
  const refBuf = await sharp(refPath).resize({ width: NORM_W }).raw().toBuffer({ resolveWithObject: true });
  const genBuf = await sharp(genPath).resize({ width: NORM_W }).raw().toBuffer({ resolveWithObject: true });

  const h = Math.min(refBuf.info.height, genBuf.info.height);
  const ch = refBuf.info.channels;

  const toPng = (b: { data: Buffer; info: OutputInfo }) => {
    const png = new PNG({ width: NORM_W, height: h });
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < NORM_W; x++) {
        const si = (y * b.info.width + x) * b.info.channels;
        const di = (y * NORM_W + x) * 4;
        png.data[di] = b.data[si];
        png.data[di + 1] = b.data[si + 1];
        png.data[di + 2] = b.data[si + 2];
        png.data[di + 3] = b.info.channels === 4 ? b.data[si + 3] : 255;
      }
    }
    return png;
  };

  const a = toPng(refBuf);
  const b = toPng(genBuf);

  // Poner a cero las franjas animadas en ambas imágenes: pixelmatch las verá
  // idénticas y el score deja de depender de la fase del bucle.
  if (maskBands) {
    for (const [from, to] of maskBands) {
      const y0 = Math.floor(from * h);
      const y1 = Math.ceil(to * h);
      for (let y = y0; y < Math.min(y1, h); y++) {
        for (let x = 0; x < NORM_W; x++) {
          const i = (y * NORM_W + x) * 4;
          a.data[i] = a.data[i + 1] = a.data[i + 2] = 0;
          a.data[i + 3] = 255;
          b.data[i] = b.data[i + 1] = b.data[i + 2] = 0;
          b.data[i + 3] = 255;
        }
      }
    }
  }
  const diff = new PNG({ width: NORM_W, height: h });
  const mismatched = pixelmatch(a.data, b.data, diff.data, NORM_W, h, {
    threshold: 0.1,
    includeAA: true,
  });
  fs.mkdirSync(path.dirname(diffPath), { recursive: true });
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const total = NORM_W * h;
  const heightDelta = Math.abs(refBuf.info.height - genBuf.info.height);
  return {
    pixelSimilarity: total ? 1 - mismatched / total : 0,
    mismatchedPixels: mismatched,
    refSize: `${refMeta.width}x${refMeta.height}`,
    genSize: `${genMeta.width}x${genMeta.height}`,
    heightDeltaNormalized: heightDelta,
    ch,
  };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(DIFF_DIR, { recursive: true });

  const report: Record<string, unknown> = { iteration: ITER, page: PAGE, route: ROUTE, viewports: {} };

  for (const vp of VIEWPORTS) {
    const refPath = path.join(REF_DIR, `${vp.name}.png`);
    if (!fs.existsSync(refPath)) {
      console.warn(`[compare] falta referencia ${refPath}`);
      continue;
    }

    // 1. Capturar la réplica con EXACTAMENTE el mismo método que la referencia
    const ctx = await browser.newContext({
      ...BROWSER_CONTEXT_OPTIONS,
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await ctx.newPage();
    await installNameShim(page);
    await page.goto(BASE + ROUTE, { waitUntil: 'networkidle', timeout: 60000 });
    await waitForContent(page);
    const genPath = path.join(OUT_DIR, `${vp.name}.png`);
    const gen = await captureStitched(page, genPath, { settleMs: 700 });
    await ctx.close();

    const refMeta = await sharp(refPath).metadata();

    // 2. Full-page (solo informativo, NO es el gate)
    const full = await compareCrops(refPath, genPath, path.join(DIFF_DIR, `diff-${vp.name}-full.png`));

    // 3. Por sección (esto SÍ es el gate)
    const refSections: SectionBox[] = JSON.parse(
      fs.readFileSync(path.join('references', 'pages', PAGE, `sections${vp.name === 'desktop' ? '' : '-' + vp.name}.json`), 'utf8')
    ).map((s: { name: string; y: number; h: number }) => ({ name: s.name, y: s.y, h: s.h }));

    const { boxes: genSections } = await measureReplicaSections(browser, vp.width, vp.height);

    const sectionScores: Record<string, unknown> = {};
    for (const rs of refSections) {
      const gs = genSections.find((g) => g.name === rs.name);
      if (!gs) {
        sectionScores[rs.name] = { error: 'sección ausente en la réplica (falta data-section)' };
        continue;
      }
      const rCrop = path.join(OUT_DIR, `crop-ref-${vp.name}-${rs.name}.png`);
      const gCrop = path.join(OUT_DIR, `crop-gen-${vp.name}-${rs.name}.png`);
      const rH = Math.min(rs.h, refMeta.height! - rs.y);
      const gH = Math.min(gs.h, gen.height - gs.y);
      if (rH < 10 || gH < 10) continue;
      await sharp(refPath).extract({ left: 0, top: rs.y, width: refMeta.width!, height: rH }).toFile(rCrop);
      await sharp(genPath).extract({ left: 0, top: gs.y, width: gen.width, height: gH }).toFile(gCrop);
      const bands = ANIMATED_BANDS[rs.name];
      const r = await compareCrops(rCrop, gCrop, path.join(DIFF_DIR, `diff-${vp.name}-${rs.name}.png`));
      const masked = bands
        ? await compareCrops(rCrop, gCrop, path.join(DIFF_DIR, `diff-${vp.name}-${rs.name}-static.png`), bands)
        : r;
      sectionScores[rs.name] = {
        pixelSimilarity: Number(r.pixelSimilarity.toFixed(4)),
        staticSimilarity: Number(masked.pixelSimilarity.toFixed(4)),
        hasMarquee: !!bands,
        refHeight: rs.h,
        genHeight: gs.h,
        heightDeltaPx: gs.h - rs.h,
      };
    }

    const vals = Object.values(sectionScores)
      .map((s) => (s as { pixelSimilarity?: number }).pixelSimilarity)
      .filter((v): v is number => typeof v === 'number');
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    const statics = Object.values(sectionScores)
      .map((s) => (s as { staticSimilarity?: number }).staticSimilarity)
      .filter((v): v is number => typeof v === 'number');
    const avgStatic = statics.length ? statics.reduce((a, b) => a + b, 0) / statics.length : 0;

    (report.viewports as Record<string, unknown>)[vp.name] = {
      fullPage: {
        pixelSimilarity: Number(full.pixelSimilarity.toFixed(4)),
        refSize: full.refSize,
        genSize: full.genSize,
      },
      refHeight: refMeta.height,
      genHeight: gen.height,
      totalHeightDelta: gen.height - refMeta.height!,
      sectionAverage: Number(avg.toFixed(4)),
      sectionAverageStatic: Number(avgStatic.toFixed(4)),
      sections: sectionScores,
    };

    console.log(`\n=== ${vp.name.toUpperCase()} ===`);
    console.log(`  full-page: ${(full.pixelSimilarity * 100).toFixed(1)}%  (ref ${full.refSize} vs gen ${full.genSize})`);
    console.log(`  media por sección: ${(avg * 100).toFixed(1)}%   (sin marquees: ${(avgStatic * 100).toFixed(1)}%)`);
    for (const [name, s] of Object.entries(sectionScores)) {
      const sc = s as {
        pixelSimilarity?: number; staticSimilarity?: number; hasMarquee?: boolean;
        heightDeltaPx?: number; error?: string;
      };
      if (sc.error) console.log(`    ${name.padEnd(14)} ${sc.error}`);
      else {
        const stat = sc.hasMarquee
          ? `  (sin marquee: ${((sc.staticSimilarity ?? 0) * 100).toFixed(1)}%)`
          : '';
        console.log(
          `    ${name.padEnd(14)} ${((sc.pixelSimilarity ?? 0) * 100).toFixed(1)}%   Δalto ${sc.heightDeltaPx! > 0 ? '+' : ''}${sc.heightDeltaPx}px${stat}`
        );
      }
    }
  }

  fs.writeFileSync(path.join(DIFF_DIR, 'scores.json'), JSON.stringify(report, null, 2));
  console.log(`\n[compare] informe -> ${path.join(DIFF_DIR, 'scores.json')}`);
  await browser.close();
})();
