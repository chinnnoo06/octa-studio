import type { Page, Browser } from 'playwright';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import {
  VIEWPORTS, BROWSER_CONTEXT_OPTIONS, waitForContent, installNameShim, type Viewport,
} from './capture-clean';
import { dismissOverlays } from './dismiss-overlays';

/**
 * Captura full-page haciendo scroll REAL en tiles del tamano del viewport.
 *
 * Por que existe: este sitio usa GSAP ScrollTrigger + Webflow IX2. Un
 * page.screenshot({fullPage:true}) redimensiona el viewport al alto total y
 * las animaciones scroll-triggered NUNCA se disparan -> secciones en blanco.
 * Haciendo scroll de verdad, cada tile se captura con sus animaciones ya
 * reproducidas, que es lo que ve un usuario.
 */
export async function captureStitched(
  page: Page,
  outputPath: string,
  opts: { settleMs?: number; maxHeight?: number } = {}
): Promise<{ width: number; height: number; tiles: number }> {
  const settle = opts.settleMs ?? 900;
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  // Desactivar scroll suave (rompe el posicionamiento exacto de los tiles)
  await page.addStyleTag({
    content: 'html,body{scroll-behavior:auto !important;}*{scroll-behavior:auto !important;}',
  });

  const vp = page.viewportSize()!;
  const viewportH = vp.height;

  // 1er pase: recorrer entera para disparar todo (lazy images incluidas).
  // La pausa por paso es deliberadamente generosa: con saltos de 90ms el
  // IntersectionObserver de framer-motion se salta elementos que entran y
  // salen del viewport entre dos entregas de callback, y las animaciones
  // `whileInView` no llegan a dispararse. Webflow no tiene ese problema
  // porque IX2 escucha el scroll directamente.
  await page.evaluate(async (vh: number) => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    for (let y = 0; y < document.documentElement.scrollHeight; y += Math.floor(vh / 2)) {
      window.scrollTo(0, y);
      await sleep(250);
    }
  }, viewportH);
  // Margen para que terminen las animaciones largas (el odómetro dura 3s)
  await page.waitForTimeout(3500);

  const pageH = Math.min(
    await page.evaluate(() => document.documentElement.scrollHeight),
    opts.maxHeight ?? 40000
  );

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);

  const tmpDir = outputPath + '.tiles';
  fs.mkdirSync(tmpDir, { recursive: true });

  const composites: { input: string; top: number; left: number }[] = [];
  let tiles = 0;

  for (let top = 0; top < pageH; top += viewportH) {
    const targetY = Math.min(top, Math.max(0, pageH - viewportH));
    await page.evaluate((y: number) => window.scrollTo(0, y), targetY);
    await page.waitForTimeout(settle);

    // scroll real alcanzado (puede diferir si la pagina lo limita)
    const actualY: number = await page.evaluate(() => Math.round(window.scrollY));

    const tilePath = path.join(tmpDir, `tile-${tiles}.png`);
    await page.screenshot({ path: tilePath, fullPage: false });

    // el tile cubre [actualY, actualY+viewportH); recortamos la parte util
    const wantFrom = top;
    const wantTo = Math.min(top + viewportH, pageH);
    const cutTop = wantFrom - actualY;
    const cutH = wantTo - wantFrom;

    if (cutTop >= 0 && cutTop + cutH <= viewportH && cutH > 0) {
      const cropped = path.join(tmpDir, `crop-${tiles}.png`);
      await sharp(tilePath).extract({ left: 0, top: cutTop, width: vp.width, height: cutH }).toFile(cropped);
      composites.push({ input: cropped, top: wantFrom, left: 0 });
    } else if (cutH > 0) {
      composites.push({ input: tilePath, top: actualY, left: 0 });
    }
    tiles++;
    if (tiles > 80) break;
  }

  await sharp({
    create: { width: vp.width, height: pageH, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  })
    .composite(composites)
    .png()
    .toFile(outputPath);

  fs.rmSync(tmpDir, { recursive: true, force: true });
  return { width: vp.width, height: pageH, tiles };
}

/** Captura los 3 breakpoints con el metodo stitched. */
export async function captureAllViewportsStitched(
  browser: Browser,
  url: string,
  outputDir: string,
  opts: { settleMs?: number } = {}
): Promise<Record<Viewport['name'], { path: string; width: number; height: number }>> {
  fs.mkdirSync(outputDir, { recursive: true });

  const results = await Promise.all(
    VIEWPORTS.map(async (vp) => {
      const ctx = await browser.newContext({
        ...BROWSER_CONTEXT_OPTIONS,
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await ctx.newPage();
      await installNameShim(page);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(async () => {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
      });
      await waitForContent(page);
      await dismissOverlays(page);
      const outPath = path.join(outputDir, `${vp.name}.png`);
      const r = await captureStitched(page, outPath, opts);
      await ctx.close();
      console.log(`[stitch] ${vp.name} -> ${r.width}x${r.height} (${r.tiles} tiles)`);
      return [vp.name, { path: outPath, ...r }] as const;
    })
  );

  return Object.fromEntries(results) as unknown as Record<
    Viewport['name'],
    { path: string; width: number; height: number }
  >;
}
