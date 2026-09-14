import type { MetadataRoute } from 'next';

/**
 * Bloqueo total de indexación.
 *
 * Esto es la réplica de un template comercial de Webflow: publicarlo indexable
 * sería contenido duplicado del original y un problema de derechos. Se sirve
 * como despliegue de preview y no debe aparecer en buscadores.
 * Para un sitio propio, cambiar a `{ allow: '/' }` y añadir el sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
  };
}
