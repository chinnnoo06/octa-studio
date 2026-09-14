import fs from 'fs';
import path from 'path';

/**
 * El crawler copió las 122 imágenes con su nombre hash de Webflow y después se
 * duplicaron con nombres limpios. Solo las segundas se referencian desde el
 * código; el resto infla el deploy sin usarse.
 *
 * Uso:  pnpm exec tsx scripts/prune-assets.ts [--delete]
 */
const code: string[] = [];

function walkSrc(dir: string) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walkSrc(p);
    else if (/\.(tsx?|css)$/.test(f.name)) code.push(fs.readFileSync(p, 'utf8'));
  }
}
walkSrc('src');
const blob = code.join('\n');

const used = new Set<string>();
for (const m of blob.matchAll(/\/images\/[A-Za-z0-9._/%-]+/g)) used.add(m[0]);

const all: string[] = [];
function walkPub(dir: string) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walkPub(p);
    else all.push('/' + path.relative('public', p).split(path.sep).join('/'));
  }
}
walkPub('public/images');

const orphans = all.filter((f) => !used.has(f));
const sizeOf = (f: string) => fs.statSync(path.join('public', f)).size;
const total = orphans.reduce((s, f) => s + sizeOf(f), 0);
const kept = all.length - orphans.length;

console.log(`referenciadas por el código: ${used.size}`);
console.log(`archivos en public/images:   ${all.length}`);
console.log(`se conservan:                ${kept}`);
console.log(`sin referenciar:             ${orphans.length}  (${(total / 1048576).toFixed(1)} MB)`);

if (process.argv[2] === '--delete') {
  for (const f of orphans) fs.unlinkSync(path.join('public', f));
  console.log(`\nborrados ${orphans.length} archivos.`);
} else {
  console.log('\n(dry-run — pasa --delete para borrarlos)');
  orphans.slice(0, 8).forEach((f) => console.log('  ' + f));
}
