import type { TNavLink } from '@/types/content.types';

export const NAV_LINKS: TNavLink[] = [
  { label: 'Inicio',    href: '/' },
  { label: 'Nosotros',  href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Blogs',    href: '/blogs' },
  { label: 'Contacto',  href: '/contacto' },
];

export const LEGAL_LINKS: TNavLink[] = [
  { label: 'Privacidad y aviso legal', href: '/privacidad' },
  { label: 'Licencia y Creditos', href: '/creditos' },
];
