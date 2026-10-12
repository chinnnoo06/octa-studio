import { FaClipboard, FaComments, FaHammer, FaHouse, FaRightFromBracket, FaTags } from 'react-icons/fa6';
import type { TAdminLink } from '@/types/content.types';

/** Raiz del panel: el dashboard de metricas. */
export const ADMIN_HOME = '/admin';

// Crear cada entidad vive en el boton "Nuevo" de su listado, no en la sidebar.
export const ADMIN_LINKS: TAdminLink[] = [
  { label: 'Inicio',      href: ADMIN_HOME,           icon: FaHouse },
  { label: 'Blogs',       href: '/admin/blogs',       icon: FaClipboard },
  { label: 'Categorías Blog', href: '/admin/blog-categorias', icon: FaTags },
  { label: 'Proyectos',   href: '/admin/proyectos',   icon: FaHammer },
  { label: 'Testimonios', href: '/admin/testimonios', icon: FaComments },
];

export const ADMIN_LOGOUT = { label: 'Cerrar sesión', icon: FaRightFromBracket } as const;
