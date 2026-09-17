import type { Metadata } from 'next';

export const SITE_NAME = 'Octa Building Studio';

type TPageMetadata = {
  /** Sin el nombre del sitio: la plantilla del layout raíz lo añade. */
  title: string;
  description: string;
  /** Ruta absoluta dentro del sitio, p. ej. `/servicios`. */
  path: string;
};

/**
 * Metadata completa para una página pública, con el mismo bloque Open Graph y
 * Twitter que la home. Hace falta porque Next no fusiona `openGraph` ni
 * `twitter` con los del layout: si una página define solo `title`, comparte
 * en redes con el título y la descripción de la home.
 */
export const pageMetadata = ({ title, description, path }: TPageMetadata): Metadata => {
  const full = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: path,
      type: 'website',
      locale: 'es_MX',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: full,
      description,
    },
  };
};
