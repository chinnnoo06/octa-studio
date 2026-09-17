import type { TImageCredit } from '@/types/content.types';

export const MAGNIFIC_ATTRIBUTION = {
  text: 'Designed by Magnific',
  url: 'https://www.magnific.com',
} as const;

export const IMAGE_CREDITS: TImageCredit[] = [
  { source: 'magnific', title: 'Fondo 1', usedIn: 'Banner del hero de Nosotros y fondo del pie de página' },
  { source: 'magnific', title: 'Fondo 2', usedIn: 'Banner del hero de Servicios y sección de proceso de la home' },
  { source: 'magnific', title: 'Fondo 3', usedIn: 'Sección de testimonios' },
  { source: 'magnific', title: 'Fondo 4', usedIn: 'Sección de llamada a la acción' },
  { source: 'magnific', title: 'Fondo 5', usedIn: 'Banner del hero de Proyectos' },
  { source: 'magnific', title: 'Fondo 6', usedIn: 'Banner del hero del Blog' },
  { source: 'magnific', title: 'Fondo 7', usedIn: 'Banner del hero de Contacto' },
];

export const DEVELOPER = {
  name: 'Menda-Studio',
  url: 'https://menda-studio.com',
} as const;
