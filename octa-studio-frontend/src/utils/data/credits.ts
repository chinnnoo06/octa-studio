import type { TImageCredit } from '@/types/content.types';

export const MAGNIFIC_ATTRIBUTION = {
  text: 'Designed by Magnific',
  url: 'https://www.magnific.com',
} as const;

export const IMAGE_CREDITS: TImageCredit[] = [
  { title: 'Fondo 1', usedIn: 'Banner del hero de Nosotros y fondo del pie de página' },
  { title: 'Fondo 2', usedIn: 'Banner del hero de Servicios y sección de proceso de la home' },
  { title: 'Fondo 3', usedIn: 'Sección de testimonios' },
  { title: 'Fondo 4', usedIn: 'Sección de llamada a la acción' },
  { title: 'Fondo 5', usedIn: 'Banner del hero de Proyectos' },
  { title: 'Fondo 6', usedIn: 'Banner del hero del Blog' },
  { title: 'Fondo 7', usedIn: 'Banner del hero de Contacto' },
];

export const DEVELOPER = {
  name: 'Menda-Studio',
  url: 'https://menda-studio.com',
} as const;
