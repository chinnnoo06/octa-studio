import type { Metadata } from 'next';
import { CONTACT } from './contact';

export const SITE = {
  name: 'Octa Building Studio',
  url: 'https://octabuilding-studio.com',
  locale: 'es_MX',
  title: 'Octa Building Studio | Diseño, fabricación y montaje de stands para expos',
  description: 'Diseñamos, fabricamos, montamos y desmontamos stands para ferias, congresos y eventos masivos. 20 años de experiencia con equipo propio en Guadalajara, Monterrey, CDMX, todo México y Estados Unidos.',
  shortDescription: 'Diseño, fabricación y montaje de stands para expos, congresos y eventos en México y Estados Unidos.',
  ogImage: '/og-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Octa Building Studio – Diseño, fabricación y montaje de stands para expos y eventos',
  logo: '/logo.png',
  themeColor: '#18608C',
} as const;

export const BUSINESS = {
  legalName: 'Octa Building Studio',
  email: CONTACT.emails[0].address,
  phone: CONTACT.phone.href.replace('tel:', ''),
  whatsapp: `+${CONTACT.whatsapp.number}`,
  address: {
    locality: 'Guadalajara',
    region: 'Jalisco',
    country: 'MX',
  },
  areaServed: [
    { '@type': 'City', name: 'Guadalajara' },
    { '@type': 'City', name: 'Monterrey' },
    { '@type': 'City', name: 'Ciudad de México' },
    { '@type': 'Country', name: 'México' },
    { '@type': 'Country', name: 'Estados Unidos' },
  ],
} as const;

/**
 * Next mezcla la metadata de forma superficial: un `openGraph` o `twitter` en una
 * page reemplaza entero al del layout. Cada page parte de estas bases para no
 * perder la imagen, el idioma ni el nombre del sitio.
 */
export const OG_IMAGE = {
  url: SITE.ogImage,
  width: SITE.ogImageWidth,
  height: SITE.ogImageHeight,
  alt: SITE.ogImageAlt,
};

export const SHARED_OPEN_GRAPH: NonNullable<Metadata['openGraph']> = {
  type: 'website',
  locale: SITE.locale,
  siteName: SITE.name,
  images: [OG_IMAGE],
};

export const SHARED_TWITTER: NonNullable<Metadata['twitter']> = {
  card: 'summary_large_image',
  images: [{ url: SITE.ogImage, alt: SITE.ogImageAlt }],
};
