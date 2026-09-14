import { chromium } from 'playwright';
import { BROWSER_CONTEXT_OPTIONS, waitForContent, installNameShim } from './capture-clean';

const URL = process.argv[2] || 'http://localhost:3000/';
const W = Number(process.argv[3] || 1440);

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ...BROWSER_CONTEXT_OPTIONS, viewport: { width: W, height: 900 } });
  const page = await ctx.newPage();
  await installNameShim(page);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await waitForContent(page);

  // recorrer la pagina para disparar las animaciones, igual que la captura
  await page.evaluate(async () => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { window.scrollTo(0, y); await sleep(90); }
    window.scrollTo(0, 0); await sleep(500);
  });
  await page.waitForTimeout(4000); // dar tiempo a los odometros (3s)

  const out = await page.evaluate(() => {
    const secs = Array.from(document.querySelectorAll('[data-section]')).map((el) => {
      const r = el.getBoundingClientRect();
      return { name: el.getAttribute('data-section'), y: Math.round(r.y + window.scrollY), h: Math.round(r.height) };
    });
    const odos = Array.from(document.querySelectorAll('[data-odometer]')).map((el) => {
      const track = el.firstElementChild as HTMLElement | null;
      return { transform: track ? getComputedStyle(track).transform : 'sin track', h: (el as HTMLElement).offsetHeight };
    });
    return { secs, odos, total: document.documentElement.scrollHeight };
  });
  console.log('=== SECCIONES DE LA REPLICA ===');
  out.secs.forEach((s) => console.log(`  ${String(s.name).padEnd(14)} y=${String(s.y).padStart(6)} h=${String(s.h).padStart(5)}`));
  console.log('total:', out.total);
  console.log('\n=== ODOMETROS ===');
  out.odos.forEach((o, i) => console.log(`  ${i}: h=${o.h} transform=${o.transform}`));
  await b.close();
})();
