import { chromium } from 'playwright';
import { BROWSER_CONTEXT_OPTIONS, waitForContent, installNameShim } from './capture-clean';
import { captureStitched } from './capture-stitch';

const URL = process.argv[2] || 'http://localhost:3000/';
const OUT = process.argv[3] || '.captures/shell.png';
const W = Number(process.argv[4] || 1440);
const H = Number(process.argv[5] || 900);

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ...BROWSER_CONTEXT_OPTIONS, viewport: { width: W, height: H } });
  const page = await ctx.newPage();
  await installNameShim(page);
  const errors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message.slice(0, 200)));
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await waitForContent(page);
  const r = await captureStitched(page, OUT, { settleMs: 500 });
  console.log(`captura ${OUT}: ${r.width}x${r.height} (${r.tiles} tiles)`);
  if (errors.length) { console.log('\n=== ERRORES DE CONSOLA ==='); errors.slice(0, 15).forEach((e) => console.log('  ' + e)); }
  else console.log('sin errores de consola');
  await b.close();
})();
