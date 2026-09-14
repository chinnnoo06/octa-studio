import fs from 'fs';
const html = fs.readFileSync('references/pages/home/dom.html', 'utf8');
const start = html.indexOf('right-social-wrap');
const block = html.slice(start, start + 20000);

// cada <a class="footer-social-box"> lleva su href y un <svg> dentro
const anchors = block.split('footer-social-box').slice(1);
const names = ['facebook', 'x', 'linkedin', 'instagram'];
const out: { name: string; href: string; paths: string[]; viewBox: string }[] = [];

anchors.slice(0, 4).forEach((chunk, i) => {
  const prev = block.slice(0, block.indexOf(chunk));
  const hrefs = prev.match(/href="([^"]+)"/g) || [];
  const href = hrefs.length ? hrefs[hrefs.length - 1].slice(6, -1) : '';
  const svgStart = chunk.indexOf('<svg');
  const svgEnd = chunk.indexOf('</svg>');
  const svg = chunk.slice(svgStart, svgEnd);
  const viewBox = (svg.match(/viewBox="([^"]*)"/) || [])[1] || '0 0 35 35';
  const paths = (svg.match(/<path[^>]*d="[^"]*"/g) || []).map((p) => (p.match(/d="([^"]*)"/) || [])[1]);
  out.push({ name: names[i], href, paths, viewBox });
  console.log(`${names[i].padEnd(10)} href=${href.padEnd(30)} viewBox=${viewBox} paths=${paths.length} dLen=${paths.map(p=>p.length).join(',')}`);
});

const body = out
  .map(
    (s) => `  ${s.name}: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="${s.viewBox}" fill="currentColor" aria-hidden="true" {...props}>
${s.paths.map((d) => `      <path d="${d}" />`).join('\n')}
    </svg>
  ),`
  )
  .join('\n');

const tsx = `/**
 * Iconos sociales extraídos del SVG inline del footer original (viewBox 35×35).
 * Se inlinean en vez de usar lucide-react porque la v1 ya no incluye iconos de
 * marca, y además así el trazo coincide exactamente con el del sitio clonado.
 */
export const SocialIcon = {
${body}
} as const;

export type SocialIconName = keyof typeof SocialIcon;
`;
fs.writeFileSync('src/components/ui/SocialIcon.tsx', tsx);
console.log('\nsrc/components/ui/SocialIcon.tsx escrito:', tsx.length, 'bytes');
