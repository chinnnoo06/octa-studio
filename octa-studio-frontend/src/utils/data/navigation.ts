import { FiFileText, FiFolder, FiLogOut, FiPlus, FiMessageSquare } from 'react-icons/fi';
import type { TAdminLink, TNavLink } from '@/types/content.types';

export const NAV_LINKS: TNavLink[] = [
  { label: 'Inicio',    href: '/' },
  { label: 'Nosotros',  href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Blog',     href: '/blogs' },
  { label: 'Contacto',  href: '/contacto' },
];

export const LEGAL_LINKS: TNavLink[] = [
  { label: 'Terminos y condiciones', href: '/terminos' },
  { label: 'Politica de privacidad', href: '/privacidad' },
  { label: 'Licencia y Creditos', href: '/creditos' },
];


export const ADMIN_LINKS: TAdminLink[] = [
  { label: 'Blogs',              href: '/admin/blogs',              icon: FiFileText,      exact: false },
  { label: 'Agregar blog',       href: '/admin/blogs/crear',        icon: FiPlus,          exact: true },
  { label: 'Proyectos',          href: '/admin/proyectos',          icon: FiFolder,        exact: false },
  { label: 'Agregar proyecto',   href: '/admin/proyectos/crear',    icon: FiPlus,          exact: true },
  { label: 'Testimonios',        href: '/admin/testimonios',        icon: FiMessageSquare, exact: false },
  { label: 'Agregar testimonio', href: '/admin/testimonios/crear',  icon: FiPlus,          exact: true },
];

export const ADMIN_LOGOUT = { label: 'Cerrar sesión', icon: FiLogOut } as const;
