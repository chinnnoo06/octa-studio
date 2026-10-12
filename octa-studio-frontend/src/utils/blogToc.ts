import { slugify } from './slugify';

export type TTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

/** Con menos encabezados el indice no ayuda: el articulo se lee de un vistazo. */
const MIN_TOC_HEADINGS = 3;

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
};

const toText = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (entity) => ENTITIES[entity])
    .trim();

/**
 * Da un `id` a cada h2/h3 del contenido y devuelve el indice que apunta a ellos.
 * Se hace en el servidor para que las anclas ya vengan en el HTML que lee Google.
 */
export const withHeadingAnchors = (html: string) => {
  const used = new Map<string, number>();
  const toc: TTocItem[] = [];

  const anchored = html.replace(/<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi, (match, level: string, attrs = '', inner: string) => {
    const text = toText(inner);
    if (!text) return match;

    const existing = attrs.match(/\sid="([^"]+)"/)?.[1];
    let id = existing ?? (slugify(text) || 'seccion');

    if (!existing) {
      const repeats = used.get(id) ?? 0;
      used.set(id, repeats + 1);
      if (repeats > 0) id = `${id}-${repeats + 1}`;
    }

    toc.push({ id, text, level: Number(level) as 2 | 3 });

    return existing ? match : `<h${level} id="${id}"${attrs}>${inner}</h${level}>`;
  });

  return { html: anchored, toc: toc.length >= MIN_TOC_HEADINGS ? toc : [] };
};
