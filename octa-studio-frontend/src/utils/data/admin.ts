import { HiArrowRightOnRectangle, HiChatBubbleLeftRight, HiClipboardDocumentList, HiHome, HiTag, HiWrenchScrewdriver } from 'react-icons/hi2';
import type { TAdminLink } from '@/types/content.types';

/** Raiz del panel: el dashboard de metricas. */
export const ADMIN_HOME = '/admin';

// Crear cada entidad vive en el boton "Nuevo" de su listado, no en la sidebar.
export const ADMIN_LINKS: TAdminLink[] = [
  { label: 'Inicio',      href: ADMIN_HOME,           icon: HiHome },
  { label: 'Blogs',       href: '/admin/blogs',       icon: HiClipboardDocumentList },
  { label: 'Categorías Blog', href: '/admin/blog-categorias', icon: HiTag },
  { label: 'Proyectos',   href: '/admin/proyectos',   icon: HiWrenchScrewdriver },
  { label: 'Testimonios', href: '/admin/testimonios', icon: HiChatBubbleLeftRight },
];

export const ADMIN_LOGOUT = { label: 'Cerrar sesión', icon: HiArrowRightOnRectangle } as const;
