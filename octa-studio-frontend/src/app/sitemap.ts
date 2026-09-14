import type { MetadataRoute } from 'next';
import { NAV_LINKS, LEGAL_LINKS } from '@/utils/data/navigation';

// TODO: cambiar por el dominio real antes de publicar.
const BASE = 'https://example.com';

/**
 * Se construye desde el menú, que es la fuente de verdad de las rutas del sitio.
 * Antes salía de un registro aparte con las páginas «ya replicadas»: eso era de
 * cuando esto clonaba una plantilla, y el archivo ya no existe.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [...NAV_LINKS, ...LEGAL_LINKS].map(({ href }) => ({
    url: `${BASE}${href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: href === '/' ? 1 : 0.8,
  }));
}
