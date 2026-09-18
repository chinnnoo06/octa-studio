import type { MetadataRoute } from 'next';

/**
 * Bloqueo total de indexacion mientras el sitio esta en desarrollo y tras
 * contrasena. Antes de publicar: cambiar a `{ allow: '/' }`, quitar el
 * `noindex` del layout raiz y anadir el sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
  };
}
