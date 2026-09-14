import type { Page, Browser } from 'playwright';
import path from 'path';
import fs from 'fs';
import { dismissOverlays } from './dismiss-overlays';

export interface Viewport {
  name: 'desktop' | 'tablet' | 'mobile';
  width: number;
  height: number;
}

export const VIEWPORTS: Viewport[] = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

// deviceScaleFactor FIJO en 1 para TODOS los contextos (referencia y replica).
export const BROWSER_CONTEXT_OPTIONS = {
  deviceScaleFactor: 1,
} as const;

/**
 * tsx/esbuild compila con keepNames y referencia un helper `__name` que no existe
 * en el contexto del browser. Se inyecta como string crudo (no lo toca esbuild)
 * antes de cualquier navegacion.
 */
export async function installNameShim(page: Page): Promise<void> {
  await page.addInitScript({
    content: 'globalThis.__name = globalThis.__name || function (fn) { return fn; };',
  });
  await page.evaluate('globalThis.__name = globalThis.__name || function (fn) { return fn; };').catch(() => {});
}

/** Espera basada en contenido (Paso 3.1) — reemplaza waitForTimeout fijo. */
export async function waitForContent(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page
    .waitForFunction(
      () => {
        const perf = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        const allLoaded = perf.every((r) => r.responseEnd > 0);
        const domComplete = document.readyState === 'complete';
        const noSpinner = !document.querySelector(
          '[class*="spinner"], [class*="skeleton"], [aria-busy="true"]'
        );
        return allLoaded && domComplete && noSpinner;
      },
      { timeout: 15000 }
    )
    .catch(() => {
      console.warn('[capture] waitForContent timeout — continuando');
    });
}

/** Scroll incremental para forzar lazy-load + disparar animaciones scroll-triggered. */
export async function scrollThroughPage(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const step = 800;
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    let y = 0;
    const maxLoops = 200;
    for (let i = 0; i < maxLoops; i++) {
      window.scrollTo(0, y);
      await delay(120);
      y += step;
      if (y > document.body.scrollHeight) break;
    }
    window.scrollTo(0, document.body.scrollHeight);
    await delay(400);
    window.scrollTo(0, 0);
    await delay(400);
  });
  await page.waitForTimeout(500);
}

/**
 * Full-page screenshot con:
 *  1. DPR 1 (fijado en el contexto)
 *  2. sticky/fixed ocultados durante la captura (evita navbars duplicadas)
 *  3. restauracion posterior
 */
export async function captureCleanFullPage(page: Page, outputPath: string): Promise<void> {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*')) as HTMLElement[];
    for (const el of all) {
      const s = getComputedStyle(el);
      if (s.position === 'sticky' || s.position === 'fixed') {
        if (el.offsetHeight > 0 && el.offsetWidth > 0) {
          el.setAttribute('data-ccfp-hidden', 'true');
          el.style.setProperty('visibility', 'hidden', 'important');
        }
      }
    }
  });

  await page.screenshot({ path: outputPath, fullPage: true });

  await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('[data-ccfp-hidden="true"]')) as HTMLElement[];
    for (const el of els) {
      el.style.removeProperty('visibility');
      el.removeAttribute('data-ccfp-hidden');
    }
  });
}

/** Captura los 3 breakpoints en paralelo, 3 contexts independientes, DPR 1. */
export async function captureAllViewports(
  browser: Browser,
  url: string,
  outputDir: string
): Promise<Record<Viewport['name'], string>> {
  fs.mkdirSync(outputDir, { recursive: true });

  const results = await Promise.all(
    VIEWPORTS.map(async (vp) => {
      const ctx = await browser.newContext({
        ...BROWSER_CONTEXT_OPTIONS,
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await ctx.newPage();
      await installNameShim(page);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(async () => {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      });
      await waitForContent(page);
      await dismissOverlays(page);
      await scrollThroughPage(page);
      await dismissOverlays(page); // 2o pase: exit-intent / scroll-triggered
      const outPath = path.join(outputDir, `${vp.name}.png`);
      await captureCleanFullPage(page, outPath);
      await ctx.close();
      console.log(`[capture] ${vp.name} -> ${outPath}`);
      return [vp.name, outPath] as const;
    })
  );

  return Object.fromEntries(results) as Record<Viewport['name'], string>;
}
