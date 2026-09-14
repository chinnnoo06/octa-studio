import { chromium, type Page, type Browser } from 'playwright';
import fs from 'fs';
import path from 'path';
import {
  captureAllViewports,
  waitForContent,
  scrollThroughPage,
  BROWSER_CONTEXT_OPTIONS,
  installNameShim,
} from './capture-clean';
import { dismissOverlays } from './dismiss-overlays';

const TARGET = process.argv[2] || 'https://livinor.webflow.io/';
const PAGE_NAME = process.argv[3] || 'home';
const REF = path.join('references', 'pages', PAGE_NAME);
const SHARED = path.join('references', 'shared-assets');

const mk = (p: string) => fs.mkdirSync(p, { recursive: true });
const write = (p: string, d: unknown) => {
  mk(path.dirname(p));
  fs.writeFileSync(p, typeof d === 'string' ? d : JSON.stringify(d, null, 2));
};

// ---------- descarga de assets ----------
const downloaded = new Map<string, string>();

async function download(page: Page, url: string, destDir: string): Promise<string | null> {
  if (!url || url.startsWith('data:')) return null;
  if (downloaded.has(url)) return downloaded.get(url)!;
  try {
    const res = await page.request.get(url, { timeout: 30000 });
    if (!res.ok()) return null;
    const buf = await res.body();
    if (!buf.length) return null;
    let name = decodeURIComponent(new URL(url).pathname.split('/').pop() || 'asset');
    name = name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-90);
    if (!path.extname(name)) {
      const ct = res.headers()['content-type'] || '';
      const ext = ct.includes('svg') ? '.svg'
        : ct.includes('png') ? '.png'
        : ct.includes('webp') ? '.webp'
        : ct.includes('jpeg') ? '.jpg'
        : ct.includes('woff2') ? '.woff2'
        : ct.includes('mp4') ? '.mp4'
        : '.bin';
      name += ext;
    }
    mk(destDir);
    let dest = path.join(destDir, name);
    let i = 1;
    while (fs.existsSync(dest) && fs.statSync(dest).size !== buf.length) {
      dest = path.join(destDir, `${path.basename(name, path.extname(name))}-${i++}${path.extname(name)}`);
    }
    fs.writeFileSync(dest, buf);
    downloaded.set(url, dest);
    return dest;
  } catch {
    return null;
  }
}

(async () => {
  const browser: Browser = await chromium.launch({ headless: true });

  // ============ 1. Screenshots 3 breakpoints ============
  console.log('[crawl] === capturando 3 breakpoints ===');
  const shots = await captureAllViewports(browser, TARGET, path.join(REF, 'screenshots'));

  // ============ 2. Sesion desktop para extraccion ============
  const ctx = await browser.newContext({
    ...BROWSER_CONTEXT_OPTIONS,
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  await installNameShim(page);

  const netAssets = new Set<string>();
  page.on('response', (r) => {
    const u = r.url();
    if (/\.(png|jpe?g|webp|avif|svg|gif|woff2?|ttf|otf|mp4|webm)(\?|$)/i.test(u)) netAssets.add(u);
  });

  await page.goto(TARGET, { waitUntil: 'networkidle', timeout: 60000 }).catch(async () => {
    await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
  });
  await waitForContent(page);

  const preHas = await page.evaluate(
    () => !!document.querySelector('[role="dialog"],[class*="consent"],[class*="cookie"]')
  );
  if (preHas) {
    await page.screenshot({
      path: path.join(REF, 'screenshots', 'pre-dismissal.png'),
      fullPage: false,
    });
  }
  const overlayResult = await dismissOverlays(page);
  await scrollThroughPage(page);
  await dismissOverlays(page);

  // ============ 3. DOM completo ============
  const html = await page.content();
  write(path.join(REF, 'dom.html'), html);
  console.log(`[crawl] dom.html ${(html.length / 1024).toFixed(0)}KB`);

  // ============ 4. Computed styles ============
  const computed = await page.evaluate(() => {
    const PROPS = [
      'display', 'position', 'flexDirection', 'justifyContent', 'alignItems', 'gap', 'rowGap',
      'columnGap', 'gridTemplateColumns', 'gridTemplateRows', 'width', 'maxWidth', 'minWidth',
      'height', 'minHeight', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
      'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'fontFamily', 'fontSize',
      'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform', 'textAlign', 'color',
      'backgroundColor', 'backgroundImage', 'backgroundSize', 'backgroundPosition',
      'borderRadius', 'borderColor', 'borderWidth', 'boxShadow', 'opacity', 'transform',
      'transition', 'animation', 'overflow', 'zIndex', 'objectFit', 'textDecorationLine',
    ];
    const out: unknown[] = [];
    const SKIP = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'META', 'LINK', 'HEAD'];

    const walk = (el: Element, depth: number, pathStr: string) => {
      if (depth > 14 || out.length > 3000) return;
      if (SKIP.includes(el.tagName)) return;
      const he = el as HTMLElement;
      const r = he.getBoundingClientRect();
      if (r.width < 1 && r.height < 1) return;
      const cs = getComputedStyle(he);
      const styles: Record<string, string> = {};
      for (const p of PROPS) {
        const v = (cs as unknown as Record<string, string>)[p];
        if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px') styles[p] = v;
      }
      const txt = Array.from(el.childNodes)
        .filter((n) => n.nodeType === 3)
        .map((n) => (n.textContent || '').trim())
        .join(' ')
        .trim();
      out.push({
        path: pathStr,
        tag: el.tagName.toLowerCase(),
        id: he.id || undefined,
        cls: typeof he.className === 'string' ? he.className.slice(0, 220) : undefined,
        bbox: {
          x: Math.round(r.x),
          y: Math.round(r.y + window.scrollY),
          w: Math.round(r.width),
          h: Math.round(r.height),
        },
        text: txt ? txt.slice(0, 220) : undefined,
        src: (he as HTMLImageElement).currentSrc || he.getAttribute('src') || undefined,
        alt: he.getAttribute('alt') || undefined,
        href: he.getAttribute('href') || undefined,
        styles,
      });
      Array.from(el.children).forEach((c, i) =>
        walk(c, depth + 1, `${pathStr}>${c.tagName.toLowerCase()}[${i}]`)
      );
    };
    walk(document.body, 0, 'body');
    return out;
  });
  write(path.join(REF, 'computed-styles.json'), computed);
  console.log(`[crawl] computed-styles.json: ${computed.length} nodos`);

  // ============ 5. Design tokens observados ============
  const tokens = await page.evaluate(() => {
    const colors = new Map<string, number>();
    const bgs = new Map<string, number>();
    const fonts = new Map<string, number>();
    const sizes = new Map<string, number>();
    const weights = new Map<string, number>();
    const radii = new Map<string, number>();
    const shadows = new Map<string, number>();
    const lhs = new Map<string, number>();
    const trackings = new Map<string, number>();
    const gradients = new Map<string, number>();

    const bump = (m: Map<string, number>, k?: string) => {
      if (k && k !== 'none' && k !== 'normal') m.set(k, (m.get(k) || 0) + 1);
    };

    for (const el of Array.from(document.querySelectorAll('*')) as HTMLElement[]) {
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      const cs = getComputedStyle(el);
      bump(colors, cs.color);
      bump(fonts, cs.fontFamily);
      bump(sizes, cs.fontSize);
      bump(weights, cs.fontWeight);
      bump(radii, cs.borderRadius);
      bump(shadows, cs.boxShadow);
      bump(lhs, cs.lineHeight);
      bump(trackings, cs.letterSpacing);
      if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') bump(bgs, cs.backgroundColor);
      if (cs.backgroundImage && cs.backgroundImage.includes('gradient')) {
        bump(gradients, cs.backgroundImage.slice(0, 200));
      }
    }

    const top = (m: Map<string, number>, n = 30) =>
      Array.from(m.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([value, count]) => ({ value, count }));

    const typo: Record<string, unknown> = {};
    for (const sel of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'button', 'li', 'span', 'blockquote']) {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el) continue;
      const cs = getComputedStyle(el);
      typo[sel] = {
        fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, color: cs.color,
        textTransform: cs.textTransform,
      };
    }

    const bodyCs = getComputedStyle(document.body);

    const faces: unknown[] = [];
    for (const ss of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(ss.cssRules || [])) {
          if (rule.constructor.name === 'CSSFontFaceRule') {
            const r = rule as unknown as { style: CSSStyleDeclaration };
            faces.push({
              family: r.style.fontFamily, weight: r.style.fontWeight,
              style: r.style.fontStyle,
              src: (r.style.getPropertyValue('src') || '').slice(0, 400),
            });
          }
        }
      } catch { /* cross-origin */ }
    }

    const rootVars: Record<string, string> = {};
    for (const ss of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(ss.cssRules || [])) {
          const r = rule as unknown as { selectorText?: string; style?: CSSStyleDeclaration };
          if (r.selectorText && /(^|,)\s*(:root|html|body)\s*($|,)/.test(r.selectorText) && r.style) {
            for (const p of Array.from(r.style) as string[]) {
              if (p.startsWith('--')) rootVars[p] = r.style.getPropertyValue(p).trim();
            }
          }
        }
      } catch { /* cross-origin */ }
    }

    const containerWidths = (() => {
      const s = new Map<string, number>();
      for (const el of Array.from(document.querySelectorAll('div,section,main,header,footer')) as HTMLElement[]) {
        const r = el.getBoundingClientRect();
        if (r.width > 600 && r.width < 1500) {
          const k = String(Math.round(r.width));
          s.set(k, (s.get(k) || 0) + 1);
        }
      }
      return top(s, 12);
    })();

    return {
      body: { bg: bodyCs.backgroundColor, color: bodyCs.color, fontFamily: bodyCs.fontFamily, fontSize: bodyCs.fontSize },
      colors: top(colors), backgrounds: top(bgs), fonts: top(fonts, 12), fontSizes: top(sizes, 30),
      fontWeights: top(weights, 12), radii: top(radii, 15), shadows: top(shadows, 12),
      lineHeights: top(lhs, 20), letterSpacings: top(trackings, 15), gradients: top(gradients, 10),
      typography_samples: typo, fontFaces: faces, rootVars, containerWidths,
    };
  });
  write(path.join(REF, 'design-tokens.json'), tokens);
  console.log('[crawl] design-tokens.json listo');

  // ============ 6. Estado dinamico (3.5.b) ============
  const dynamic = await page.evaluate(() => {
    const bb = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
    };
    const sliderSel = '.swiper,[class*="swiper"],.splide,[class*="splide"],.slick-slider,[class*="slick"],[class*="glide"],[class*="embla"],[class*="slider"],[class*="carousel"],[class*="marquee"],.w-slider,[class*="w-slider"]';
    const sliders = Array.from(document.querySelectorAll(sliderSel))
      .map((el) => ({
        selector: String((el as HTMLElement).className || '').slice(0, 180),
        tag: el.tagName.toLowerCase(),
        slideCount: el.querySelectorAll('.swiper-slide,.splide__slide,.slick-slide,[class*="slide"],.w-slide').length,
        hasArrows: !!el.querySelector('[class*="arrow"],[class*="next"],[class*="prev"],.w-slider-arrow-left,.w-slider-arrow-right'),
        hasDots: !!el.querySelector('[class*="dot"],[class*="pagination"],[class*="bullet"],.w-slider-nav'),
        bbox: bb(el),
      }))
      .filter((s) => s.bbox.w > 100 && s.bbox.h > 40);

    const animated = Array.from(
      document.querySelectorAll('[data-w-id],[data-animation],[data-aos],[data-scroll],[class*="fade"],[class*="reveal"],[class*="animate"]')
    )
      .slice(0, 120)
      .map((el) => {
        const cs = getComputedStyle(el as HTMLElement);
        return {
          tag: el.tagName.toLowerCase(),
          cls: String((el as HTMLElement).className || '').slice(0, 150),
          dataWId: el.getAttribute('data-w-id') || undefined,
          dataAnimation: el.getAttribute('data-animation') || undefined,
          transform: cs.transform, opacity: cs.opacity, animation: cs.animation,
          transition: cs.transition, bbox: bb(el),
        };
      });

    const stickies = Array.from(document.querySelectorAll('*'))
      .filter((el) => {
        const p = getComputedStyle(el as HTMLElement).position;
        return p === 'sticky' || p === 'fixed';
      })
      .slice(0, 40)
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        cls: String((el as HTMLElement).className || '').slice(0, 150),
        position: getComputedStyle(el as HTMLElement).position,
        bbox: bb(el),
      }));

    const accordions = Array.from(
      document.querySelectorAll('[aria-expanded],details,[class*="accordion"],[class*="faq"],[class*="dropdown"]')
    )
      .slice(0, 60)
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        cls: String((el as HTMLElement).className || '').slice(0, 150),
        ariaExpanded: el.getAttribute('aria-expanded'),
        bbox: bb(el),
      }))
      .filter((a) => a.bbox.w > 50);

    const videos = Array.from(document.querySelectorAll('video,[class*="video"]'))
      .slice(0, 20)
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        cls: String((el as HTMLElement).className || '').slice(0, 150),
        src: (el as HTMLVideoElement).currentSrc || el.getAttribute('src') || undefined,
        bbox: bb(el),
      }));

    const w = window as unknown as Record<string, unknown>;
    return {
      sliders, animated, stickies, accordions, videos,
      gsapPresent: !!w.gsap,
      scrollTriggerPresent: !!(w.ScrollTrigger || (w.gsap as Record<string, unknown> | undefined)?.ScrollTrigger),
      webflowIx2: !!document.querySelector('[data-w-id]'),
      lenisOrLocomotive: !!(w.Lenis || w.locomotive || document.querySelector('[data-scroll-container]')),
    };
  });
  write(path.join(REF, 'dynamic-state.json'), dynamic);
  console.log(`[crawl] dynamic-state: ${dynamic.sliders.length} sliders, ${dynamic.animated.length} animados, ${dynamic.stickies.length} sticky`);

  // ============ 7. Assets ============
  console.log('[crawl] === descargando assets ===');
  const domAssets = await page.evaluate(() => {
    const urls = new Set<string>();
    for (const img of Array.from(document.querySelectorAll('img')) as HTMLImageElement[]) {
      if (img.currentSrc) urls.add(img.currentSrc);
      if (img.src) urls.add(img.src);
      const ss = img.getAttribute('srcset');
      if (ss) {
        ss.split(',').forEach((p) => {
          const u = p.trim().split(/\s+/)[0];
          if (u) urls.add(new URL(u, location.href).href);
        });
      }
    }
    for (const el of Array.from(document.querySelectorAll('*')) as HTMLElement[]) {
      const bi = getComputedStyle(el).backgroundImage;
      if (bi && bi.includes('url(')) {
        const m = bi.match(/url\(["']?([^"')]+)["']?\)/g) || [];
        for (const g of m) {
          const u = g.replace(/url\(["']?/, '').replace(/["']?\)$/, '');
          if (!u.startsWith('data:')) urls.add(new URL(u, location.href).href);
        }
      }
    }
    for (const v of Array.from(document.querySelectorAll('video source, video')) as HTMLElement[]) {
      const s = v.getAttribute('src');
      if (s) urls.add(new URL(s, location.href).href);
    }
    return Array.from(urls);
  });

  const netArr = Array.from(netAssets);
  const fontUrls = netArr.filter((u) => /\.(woff2?|ttf|otf)(\?|$)/i.test(u));
  const imgUrls = Array.from(
    new Set([...domAssets, ...netArr.filter((u) => /\.(png|jpe?g|webp|avif|svg|gif)(\?|$)/i.test(u))])
  );
  const vidUrls = netArr.filter((u) => /\.(mp4|webm)(\?|$)/i.test(u));

  const isShared = (u: string) => /logo|favicon|icon|brand|sprite/i.test(u);
  let okImg = 0;
  for (const u of imgUrls) {
    const dir = isShared(u) ? path.join(SHARED, 'images') : path.join(REF, 'assets', 'images');
    if (await download(page, u, dir)) okImg++;
  }
  let okFont = 0;
  for (const u of fontUrls) if (await download(page, u, path.join(SHARED, 'fonts'))) okFont++;
  let okVid = 0;
  for (const u of vidUrls) if (await download(page, u, path.join(REF, 'assets', 'videos'))) okVid++;

  const inlineSvgs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('svg'))
      .slice(0, 80)
      .map((s, i) => {
        const r = s.getBoundingClientRect();
        return {
          i, markup: s.outerHTML.slice(0, 6000),
          w: Math.round(r.width), h: Math.round(r.height),
          cls: (s.getAttribute('class') || '').slice(0, 120),
        };
      })
      .filter((s) => s.w > 4 && s.h > 4)
  );
  mk(path.join(REF, 'assets', 'svgs'));
  for (const s of inlineSvgs) write(path.join(REF, 'assets', 'svgs', `inline-${s.i}.svg`), s.markup);
  write(
    path.join(REF, 'assets', 'svgs', 'index.json'),
    inlineSvgs.map((s) => ({ i: s.i, w: s.w, h: s.h, cls: s.cls }))
  );
  console.log(`[crawl] assets: ${okImg}/${imgUrls.length} imagenes, ${okFont}/${fontUrls.length} fuentes, ${okVid} videos, ${inlineSvgs.length} svg inline`);

  // ============ 8. Carruseles multi-frame (3.5.c) ============
  const carouselDir = path.join(REF, 'carousels');
  mk(carouselDir);
  const carouselMeta: unknown[] = [];
  for (let i = 0; i < Math.min(dynamic.sliders.length, 8); i++) {
    const s = dynamic.sliders[i];
    try {
      await page.evaluate((y: number) => window.scrollTo(0, Math.max(0, y - 250)), s.bbox.y);
      await page.waitForTimeout(900);
      const scrollY = await page.evaluate(() => window.scrollY);
      const clip = {
        x: Math.max(0, s.bbox.x),
        y: Math.max(0, s.bbox.y - scrollY),
        width: Math.min(s.bbox.w, 1440 - Math.max(0, s.bbox.x)),
        height: Math.min(s.bbox.h, 900 - Math.max(0, s.bbox.y - scrollY)),
      };
      if (clip.height < 20 || clip.width < 20) continue;
      await page.screenshot({ path: path.join(carouselDir, `section-${i}-frame-0.png`), clip });
      const frames = [`section-${i}-frame-0.png`];
      for (let f = 1; f <= 3; f++) {
        const clicked = await page.evaluate((sel: string) => {
          const roots = Array.from(
            document.querySelectorAll('.w-slider,[class*="swiper"],[class*="slider"],[class*="carousel"]')
          );
          for (const r of roots) {
            if (String((r as HTMLElement).className || '').slice(0, 180) === sel) {
              const nx = r.querySelector('.w-slider-arrow-right,[class*="next"],[class*="arrow-right"]') as HTMLElement | null;
              if (nx) { nx.click(); return true; }
            }
          }
          return false;
        }, s.selector);
        if (!clicked) break;
        await page.waitForTimeout(900);
        await page.screenshot({ path: path.join(carouselDir, `section-${i}-frame-${f}.png`), clip });
        frames.push(`section-${i}-frame-${f}.png`);
      }
      const meta = { index: i, ...s, frames, framesCaptured: frames.length };
      carouselMeta.push(meta);
      write(path.join(carouselDir, `section-${i}.json`), meta);
    } catch (e) {
      console.warn(`[crawl] carousel ${i} fallo: ${(e as Error).message.slice(0, 80)}`);
    }
  }
  write(path.join(carouselDir, 'index.json'), carouselMeta);
  console.log(`[crawl] carruseles capturados: ${carouselMeta.length}`);

  // ============ 9. Hover states (3.5.d) ============
  const hoverDir = path.join(REF, 'hover-states');
  mk(hoverDir);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const hoverTargets = await page.evaluate(() => {
    const sels = ['nav a', 'header a', 'a[class*="button"]', 'button', '[class*="btn"]',
      '[class*="card"]', '[class*="project"]', '[class*="product"]', '[class*="service"]'];
    const out: unknown[] = [];
    const seen = new Set<string>();
    for (const sel of sels) {
      const all = Array.from(document.querySelectorAll(sel)) as HTMLElement[];
      for (const el of all.slice(0, 3)) {
        const r = el.getBoundingClientRect();
        if (r.width < 20 || r.height < 12 || r.width > 1300) continue;
        const key = `${sel}|${Math.round(r.y + window.scrollY)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const cs = getComputedStyle(el);
        out.push({
          sel, idx: all.indexOf(el), cls: String(el.className || '').slice(0, 120),
          bbox: { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) },
          before: {
            color: cs.color, backgroundColor: cs.backgroundColor, transform: cs.transform,
            boxShadow: cs.boxShadow, borderColor: cs.borderColor, opacity: cs.opacity,
            textDecorationLine: cs.textDecorationLine,
          },
        });
      }
    }
    return out.slice(0, 22) as {
      sel: string; idx: number; cls: string;
      bbox: { x: number; y: number; w: number; h: number };
      before: Record<string, string>;
    }[];
  });

  const hoverResults: unknown[] = [];
  for (let i = 0; i < hoverTargets.length; i++) {
    const t = hoverTargets[i];
    try {
      const loc = page.locator(t.sel).nth(t.idx);
      await loc.scrollIntoViewIfNeeded({ timeout: 3000 });
      await page.waitForTimeout(300);
      await loc.hover({ timeout: 3000 });
      await page.waitForTimeout(650);
      const after = await loc.evaluate((el) => {
        const cs = getComputedStyle(el as HTMLElement);
        return {
          color: cs.color, backgroundColor: cs.backgroundColor, transform: cs.transform,
          boxShadow: cs.boxShadow, borderColor: cs.borderColor, opacity: cs.opacity,
          textDecorationLine: cs.textDecorationLine,
        } as Record<string, string>;
      });
      const changed = Object.keys(after).filter((k) => after[k] !== t.before[k]);
      const shot = `hover-${i}.png`;
      if (changed.length) await loc.screenshot({ path: path.join(hoverDir, shot) }).catch(() => {});
      hoverResults.push({
        i, selector: t.sel, cls: t.cls, bbox: t.bbox, changed,
        before: t.before, after, screenshot: changed.length ? shot : null,
      });
    } catch { /* skip */ }
  }
  write(path.join(hoverDir, 'index.json'), hoverResults);
  const changedCount = (hoverResults as { changed: string[] }[]).filter((h) => h.changed.length).length;
  console.log(`[crawl] hover states: ${changedCount}/${hoverResults.length} con cambio`);

  // ============ 10. Notas ============
  write(path.join(REF, 'crawl-notes.json'), {
    target: TARGET, pageName: PAGE_NAME, capturedAt: new Date().toISOString(),
    screenshots: shots, overlays: overlayResult, preDismissalShot: preHas,
    counts: {
      computedNodes: computed.length, images: okImg, fonts: okFont, videos: okVid,
      inlineSvgs: inlineSvgs.length, sliders: dynamic.sliders.length,
      animated: dynamic.animated.length, carousels: carouselMeta.length,
      hoverStates: hoverResults.length,
    },
    warnings: [] as string[],
  });

  await browser.close();
  console.log('[crawl] === COMPLETADO ===');
})();
