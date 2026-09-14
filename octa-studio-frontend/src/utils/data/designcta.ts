/**
 * Contenido del CTA de diseño y de la franja de ofertas.
 */

export const DESIGN_CTA = {
  eyebrowFirst: 'Design Your Space with ',
  eyebrowSpan: 'Purpose',
  titleFirst: 'Let’s Design Your Dream ',
  titleSpan: 'Home',
  cta: { label: 'Lets Talk', href: '/contact' },
} as const;

/** 4 grupos × 6 boxes = 24 en el DOM */
export const OFFERS = [
  '10% Off This Month',
  'Free Space Planning',
  '20% Off First Consultation',
] as const;
export const OFFERS_GROUPS = 4;
export const OFFERS_PER_GROUP = 6; // la secuencia de 3 va duplicada dentro de cada grupo
