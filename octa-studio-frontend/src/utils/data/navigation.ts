import { FiFileText, FiFolder, FiLogOut, FiPlus, FiMessageSquare } from 'react-icons/fi';
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


export const ADMIN_LINKS: TAdminLink[] = [
  { label: 'Blogs',              href: '/admin/blogs',              icon: FiFileText },
  { label: 'Crear blog',         href: '/admin/blogs/crear',        icon: FiPlus },
  { label: 'Proyectos',          href: '/admin/proyectos',          icon: FiFolder },
  { label: 'Crear proyecto',     href: '/admin/proyectos/crear',    icon: FiPlus },
  { label: 'Testimonios',        href: '/admin/testimonios',        icon: FiMessageSquare },
  { label: 'Crear testimonio',   href: '/admin/testimonios/crear',  icon: FiPlus },
];

export const ADMIN_LOGOUT = { label: 'Cerrar sesión', icon: FiLogOut } as const;
