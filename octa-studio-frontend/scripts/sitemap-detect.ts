import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { waitForContent, BROWSER_CONTEXT_OPTIONS, installNameShim } from './capture-clean';
import { dismissOverlays } from './dismiss-overlays';

const TARGET = process.argv[2] || 'https://livinor.webflow.io/';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ ...BROWSER_CONTEXT_OPTIONS, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await installNameShim(page);

  console.log(`[sitemap] navegando a ${TARGET}`);
  await page.goto(TARGET, { waitUntil: 'networkidle', timeout: 60000 }).catch(async () => {
    await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
  });
  await waitForContent(page);
  const overlay = await dismissOverlays(page);

  const data = await page.evaluate(() => {
    const origin = location.origin;
    const norm = (href: string) => {
      try {
        const u = new URL(href, location.href);
        if (u.origin !== origin) return null;
        let p = u.pathname.replace(/\/+$/, '');
        return p === '' ? '/' : p;
      } catch {
        return null;
      }
    };

    const navContainers = Array.from(
      document.querySelectorAll('nav, header, [role="navigation"], [class*="navbar" i], [class*="nav-menu" i]')
    );
    const navLinks: { path: string; label: string }[] = [];
    for (const c of navContainers) {
      for (const a of Array.from(c.querySelectorAll('a[href]')) as HTMLAnchorElement[]) {
        const p = norm(a.getAttribute('href') || '');
        const label = (a.textContent || '').trim().replace(/\s+/g, ' ');
        if (p && label && !navLinks.some((n) => n.path === p)) navLinks.push({ path: p, label });
      }
    }

    const footerLinks: { path: string; label: string }[] = [];
    for (const c of Array.from(document.querySelectorAll('footer, [class*="footer" i]'))) {
      for (const a of Array.from(c.querySelectorAll('a[href]')) as HTMLAnchorElement[]) {
        const p = norm(a.getAttribute('href') || '');
        const label = (a.textContent || '').trim().replace(/\s+/g, ' ');
        if (p && label && !footerLinks.some((n) => n.path === p)) footerLinks.push({ path: p, label });
      }
    }

    const allLinks: { path: string; label: string }[] = [];
    for (const a of Array.from(document.querySelectorAll('a[href]')) as HTMLAnchorElement[]) {
      const p = norm(a.getAttribute('href') || '');
      const label = (a.textContent || '').trim().replace(/\s+/g, ' ');
      if (p && !allLinks.some((n) => n.path === p)) allLinks.push({ path: p, label });
    }

    // Firma de framework
    const html = document.documentElement.outerHTML;
    const framework = {
      webflow: /wf-|webflow|data-wf-page/i.test(html),
      next: !!document.querySelector('#__next, script[src*="/_next/"]'),
      react: !!(window as any).React || /data-reactroot/.test(html),
      wordpress: /wp-content|wp-includes/i.test(html),
      gsap: /gsap|TweenMax|ScrollTrigger/i.test(html),
      swiper: /swiper/i.test(html),
      splide: /splide/i.test(html),
      slick: /slick-/i.test(html),
    };

    return {
      title: document.title,
      lang: document.documentElement.lang,
      origin,
      navLinks,
      footerLinks,
      allLinks,
      framework,
      pageHeight: document.body.scrollHeight,
      metaDescription: (document.querySelector('meta[name="description"]') as HTMLMetaElement)?.content || '',
      ogImage: (document.querySelector('meta[property="og:image"]') as HTMLMetaElement)?.content || '',
    };
  });

  const classify = (p: string) => (p === '/' ? 'homepage' : p.split('/').filter(Boolean).length > 1 ? 'subpage' : 'main');
  const navPaths = new Set(data.navLinks.map((l) => l.path));
  const seen = new Map<string, any>();
  for (const l of [...data.navLinks, ...data.footerLinks, ...data.allLinks]) {
    if (!seen.has(l.path)) {
      seen.set(l.path, {
        url: l.path,
        label: l.label || l.path,
        type: classify(l.path),
        navbar: navPaths.has(l.path),
      });
    }
  }
  const pages = Array.from(seen.values());
  const suggested = ['/', ...pages.filter((p) => p.navbar && p.url !== '/').map((p) => p.url)];

  const out = {
    domain: new URL(TARGET).hostname,
    target: TARGET,
    current_page: '/',
    title: data.title,
    lang: data.lang,
    meta_description: data.metaDescription,
    og_image: data.ogImage,
    framework_detected: data.framework,
    page_height_desktop: data.pageHeight,
    overlays: overlay,
    available_pages: pages,
    suggested_order: suggested,
  };

  fs.mkdirSync(path.join('references'), { recursive: true });
  fs.writeFileSync(path.join('references', 'site-map.json'), JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));

  await browser.close();
})();
