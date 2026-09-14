import fs from 'fs';
import path from 'path';

/**
 * Copia los assets crawleados (nombres con hash de Webflow) a los nombres
 * limpios que usa src/lib/home-data.ts, leyendo la tabla del análisis.
 * Copia, no mueve: los originales quedan en references/ como respaldo.
 */
const md = fs.readFileSync('analysis/components.md', 'utf8');
const section = md.slice(md.indexOf('## 4. Mapa de imágenes'), md.indexOf('## 5.'));

const SOURCES = [
  'references/pages/home/assets/images',
  'references/shared-assets/images',
  'references/pages/home/assets/videos',
];

const index = new Map<string, string>();
for (const dir of SOURCES) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) index.set(f, path.join(dir, f));
}

const rows = section.split('\n').filter((l) => l.startsWith('|') && l.includes('`'));
let ok = 0;
const missing: string[] = [];
const done = new Set<string>();

for (const row of rows) {
  const cells = row.split('|').map((c) => c.trim());
  if (cells.length < 6) continue;
  const srcCell = cells[2];
  const destCell = cells[5];
  const src = (srcCell.match(/`([^`]+)`/) || [])[1];
  const dest = (destCell.match(/`([^`]+)`/) || [])[1];
  if (!src || !dest || src.includes('…') || dest.includes('*')) continue;

  const from = index.get(src);
  // La tabla escribe el destino como `home/x.webp` / `shared/x.svg`;
  // la ruta real de las páginas lleva el segmento `pages/`.
  const normalized = dest.startsWith('home/') ? `pages/${dest}` : dest;
  const to = path.join('public', 'images', normalized);
  if (!from) {
    missing.push(`${src}  ->  ${dest}`);
    continue;
  }
  if (done.has(to)) continue;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  done.add(to);
  ok++;
}

console.log(`Copiados: ${ok}`);
if (missing.length) {
  console.log(`\nNO ENCONTRADOS (${missing.length}):`);
  missing.forEach((m) => console.log('  ' + m));
}

// Comprobar que toda ruta que menciona home-data.ts existe
const data = fs.readFileSync('src/lib/home-data.ts', 'utf8');
const refs = Array.from(new Set(data.match(/\/images\/[A-Za-z0-9._/-]+/g) || []));
const broken = refs.filter((r) => !fs.existsSync(path.join('public', r)));
console.log(`\nRutas referenciadas por home-data.ts: ${refs.length}`);
if (broken.length) {
  console.log(`ROTAS (${broken.length}):`);
  broken.forEach((b) => console.log('  ' + b));
} else {
  console.log('Todas resuelven. OK');
}
