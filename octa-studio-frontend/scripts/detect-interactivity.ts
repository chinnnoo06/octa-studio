import fs from 'fs';
import path from 'path';

const PAGE = process.argv[2] || 'home';
const REF = path.join('references', 'pages', PAGE);
const html = fs.readFileSync(path.join(REF, 'dom.html'), 'utf8');

const SIGNATURES: Record<string, RegExp[]> = {
  carousels: [
    /\bswiper(-container|-slide|-wrapper|-scrollbar)?\b/gi,
    /\bslick(-slide|-track|-list)?\b/gi,
    /\bglide(__slide|__track)?\b/gi,
    /\bembla__(slide|container|viewport)\b/gi,
    /\bsplide__(slide|track|list)\b/gi,
    /\bkeen-slider(__slide)?\b/gi,
    /\bcarousel-(item|inner|cell)\b/gi,
    /\bw-slider\b/gi,
    /\bw-slide\b/gi,
    /\bw-slider-nav\b/gi,
    /\bw-slider-arrow-(left|right)\b/gi,
    /class="[^"]*slider[^"]*"/gi,
    /class="[^"]*marquee[^"]*"/gi,
  ],
  animations: [
    /data-w-id="[^"]+"/g,
    /data-animation="[^"]+"/g,
    /data-aos="[^"]+"/g,
    /data-scroll="[^"]+"/g,
    /class="[^"]*\b(wow|fade-in|fade-up|reveal|animate__)[^"]*"/gi,
    /IntersectionObserver/g,
    /gsap|ScrollTrigger|SplitText/g,
  ],
  accordions: [/aria-expanded="(true|false)"/g, /class="[^"]*accordion[^"]*"/gi, /<details/g, /w-dropdown/g],
  modals: [/role="dialog"/g, /aria-modal="true"/g, /class="[^"]*(modal|lightbox|overlay)[^"]*"/gi],
  sticky: [/position:\s*sticky/g, /position:\s*fixed/g, /\bsticky\b/gi],
  forms: [/<form/g, /w-form/g, /<input/g],
  video: [/<video/g, /w-background-video/g],
  tabs: [/w-tab/g, /role="tab"/g],
};

const counts: Record<string, Record<string, number>> = {};
for (const [cat, patterns] of Object.entries(SIGNATURES)) {
  counts[cat] = {};
  for (const p of patterns) {
    const m = html.match(p);
    if (m && m.length) counts[cat][p.source.slice(0, 60)] = m.length;
  }
}

// Clases con "slider"/"marquee" reales, agrupadas
const classAttr = html.match(/class="([^"]+)"/g) || [];
const classFreq = new Map<string, number>();
for (const c of classAttr) {
  for (const cls of c.slice(7, -1).split(/\s+/)) {
    if (!cls) continue;
    classFreq.set(cls, (classFreq.get(cls) || 0) + 1);
  }
}
const interesting = Array.from(classFreq.entries())
  .filter(([c]) => /slider|slide|marquee|scroll|anim|fade|reveal|rotate|loop|track|tab|accordion|dropdown|modal/i.test(c))
  .sort((a, b) => b[1] - a[1]);

// data-w-id: cuantos elementos animados por Webflow IX2
const wIds = (html.match(/data-w-id="[^"]+"/g) || []).length;

// Mapear cada slider/marquee a la seccion (por orden de aparicion vs secciones)
const sections: { i: number; name: string; y: number; h: number }[] = JSON.parse(
  fs.readFileSync(path.join(REF, 'sections.json'), 'utf8')
);
const dyn = JSON.parse(fs.readFileSync(path.join(REF, 'dynamic-state.json'), 'utf8'));
const sectionOf = (y: number) => {
  const s = sections.find((s) => y >= s.y && y < s.y + s.h);
  return s ? s.name : 'fuera-de-rango';
};

const slidersBySection: Record<string, { cls: string; slides: number; arrows: boolean; dots: boolean; w: number; h: number; y: number }[]> = {};
for (const s of dyn.sliders) {
  const name = sectionOf(s.bbox.y);
  (slidersBySection[name] ||= []).push({
    cls: s.selector, slides: s.slideCount, arrows: s.hasArrows, dots: s.hasDots,
    w: s.bbox.w, h: s.bbox.h, y: s.bbox.y,
  });
}

const animBySection: Record<string, number> = {};
for (const a of dyn.animated) {
  const name = sectionOf(a.bbox.y);
  animBySection[name] = (animBySection[name] || 0) + 1;
}

const out = {
  page: PAGE,
  signatureCounts: counts,
  webflowIx2Elements: wIds,
  gsapPresent: dyn.gsapPresent,
  scrollTriggerPresent: dyn.scrollTriggerPresent,
  interestingClasses: interesting.slice(0, 60).map(([cls, n]) => ({ cls, n })),
  slidersBySection,
  animatedCountBySection: animBySection,
  totalSlidersDetected: dyn.sliders.length,
  totalAnimatedDetected: dyn.animated.length,
};

fs.writeFileSync(path.join(REF, 'interactivity.json'), JSON.stringify(out, null, 2));

console.log('=== SIGNATURE COUNTS ===');
for (const [cat, m] of Object.entries(counts)) {
  const total = Object.values(m).reduce((a, b) => a + b, 0);
  if (total) console.log(` ${cat.padEnd(12)} ${String(total).padStart(5)}  ${Object.keys(m).slice(0, 3).join(' | ').slice(0, 80)}`);
}
console.log('\n=== CLASES INTERESANTES (top 32) ===');
interesting.slice(0, 32).forEach(([c, n]) => console.log(`  ${c.padEnd(34)} x${n}`));
console.log('\n=== SLIDERS/MARQUEES POR SECCION ===');
for (const [sec, list] of Object.entries(slidersBySection)) {
  console.log(` ${sec}:`);
  const seen = new Set<string>();
  for (const s of list) {
    const k = s.cls.split(' ')[0];
    if (seen.has(k)) continue;
    seen.add(k);
    console.log(`    ${k.padEnd(28)} slides:${String(s.slides).padStart(3)} arrows:${s.arrows ? 'Y' : 'n'} dots:${s.dots ? 'Y' : 'n'}  ${s.w}x${s.h} @y${s.y}`);
  }
}
console.log('\n=== ELEMENTOS ANIMADOS POR SECCION ===');
Object.entries(animBySection).forEach(([s, n]) => console.log(`  ${s.padEnd(16)} ${n}`));
console.log('\nWebflow IX2 elements:', wIds, '| GSAP:', dyn.gsapPresent, '| ScrollTrigger:', dyn.scrollTriggerPresent);
