import { chromium } from 'playwright';
import { captureAllViewportsStitched } from './capture-stitch';

const TARGET = process.argv[2] || 'https://livinor.webflow.io/';
const PAGE_NAME = process.argv[3] || 'home';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const r = await captureAllViewportsStitched(browser, TARGET, `references/pages/${PAGE_NAME}/screenshots`, { settleMs: 800 });
  console.log(JSON.stringify(r, null, 2));
  await browser.close();
})();
