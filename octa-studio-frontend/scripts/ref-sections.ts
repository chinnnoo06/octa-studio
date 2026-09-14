import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { BROWSER_CONTEXT_OPTIONS, VIEWPORTS, waitForContent, installNameShim } from './capture-clean';
import { dismissOverlays } from './dismiss-overlays';

/**
 * Mide el bbox de cada sección del ORIGINAL en los 3 breakpoints, para que el
 * comparador pueda recortar por sección (Paso 6.4) en vez de comparar el
 * full-page —que miente en cuanto la altura total difiere un par de píxeles.
 *
 * Los nombres son los canónicos de la réplica; cada componente lleva el
 * `data-section` correspondiente.
 */
const TARGET = process.argv[2] || 'https://livinor.webflow.io/';
const PAGE = process.argv[3] || 'home';

/** Orden de aparición de los <section> del original -> nombre canónico. */
const NAMES = [
  'hero',
  'about',
  'projects',
  'process',
  'services',
  'designcta',
  'offers',
  'advantages',
  'products',
  'testimonials',
  'blogs',
  'footer',
];

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      ...BROWSER_CONTEXT_OPTIONS,
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await ctx.newPage();
    await installNameShim(page);
    await page.goto(TARGET, { waitUntil: 'networkidle', timeout: 90000 }).catch(async () => {
      await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 90000 });
    });
    await waitForContent(page);
    await dismissOverlays(page);

    // recorrer entera para que se estabilicen alturas (lazy images, animaciones)
    await page.evaluate(async (vh: number) => {
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
      for (let y = 0; y < document.documentElement.scrollHeight; y += Math.floor(vh / 2)) {
        window.scrollTo(0, y);
        await sleep(80);
      }
      window.scrollTo(0, 0);
      await sleep(300);
    }, vp.height);
    await page.waitForTimeout(700);

    const raw = await page.evaluate(() => {
      const secs = Array.from(document.querySelectorAll('body section'));
      return secs.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          cls: String((el as HTMLElement).className || '').slice(0, 60),
          y: Math.round(r.y + window.scrollY),
          h: Math.round(r.height),
          w: Math.round(r.width),
        };
      });
    });

    const visible = raw.filter((s) => s.h > 30);
    const mapped = visible.map((s, i) => ({
      name: NAMES[i] ?? `section-${i}`,
      cls: s.cls,
      y: s.y,
      h: s.h,
      w: s.w,
    }));

    const suffix = vp.name === 'desktop' ? '' : `-${vp.name}`;
    const dest = path.join('references', 'pages', PAGE, `sections${suffix}.json`);
    fs.writeFileSync(dest, JSON.stringify(mapped, null, 2));

    console.log(`\n=== ${vp.name.toUpperCase()} (${vp.width}px) -> ${dest} ===`);
    for (const m of mapped) {
      console.log(`  ${m.name.padEnd(13)} y=${String(m.y).padStart(6)} h=${String(m.h).padStart(5)} w=${String(m.w).padStart(5)}  ${m.cls}`);
    }
    await ctx.close();
  }

  await browser.close();
})();
