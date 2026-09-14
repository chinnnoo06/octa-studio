import type { TNavLink } from '@/types/content';

export const NAV_LINKS: TNavLink[] = [
  { label: 'Inicio',    href: '/' },
  { label: 'Nosotros',  href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Blog',     href: '/blogs' },
  { label: 'Contacto',  href: '/contacto' },
];
/** Pie legal. Las dos paginas existen pero estan pendientes de redactar. */
export const LEGAL_LINKS: TNavLink[] = [
  { label: 'Terminos y condiciones', href: '/terminos' },
  { label: 'Politica de privacidad', href: '/privacidad' },
  { label: 'Licencia y Creditos', href: '/creditos' },
];
