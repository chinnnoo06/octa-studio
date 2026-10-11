import { FaClipboard, FaComments, FaHammer, FaHouse, FaRightFromBracket } from 'react-icons/fa6';
import type { TAdminLink, TNavLink } from '@/types/content.types';

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

/** Raiz del panel: el dashboard de metricas. */
export const ADMIN_HOME = '/admin';

// Crear cada entidad vive en el boton "Nuevo" de su listado, no en la sidebar.
export const ADMIN_LINKS: TAdminLink[] = [
  { label: 'Inicio',      href: ADMIN_HOME,           icon: FaHouse },
  { label: 'Blogs',       href: '/admin/blogs',       icon: FaClipboard },
  { label: 'Proyectos',   href: '/admin/proyectos',   icon: FaHammer },
  { label: 'Testimonios', href: '/admin/testimonios', icon: FaComments },
];

export const ADMIN_LOGOUT = { label: 'Cerrar sesión', icon: FaRightFromBracket } as const;
