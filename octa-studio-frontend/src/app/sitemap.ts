import type { MetadataRoute } from 'next';
import { NAV_LINKS, LEGAL_LINKS } from '@/utils/data/navigation';

// TODO: cambiar por el dominio real antes de publicar.
const BASE = 'https://example.com';

/**
 * Se construye desde el menu, que es la fuente de verdad de las rutas del sitio.
 * Pendiente: anadir las fichas de blogs y proyectos leyendo del backend.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [...NAV_LINKS, ...LEGAL_LINKS].map(({ href }) => ({
    url: `${BASE}${href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: href === '/' ? 1 : 0.8,
  }));
}
