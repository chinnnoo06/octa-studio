import { BlogStatusSchema, type TBlogStatus } from '@/schemas/enums.schemas';
export type { TBlogStatus } from '@/schemas/enums.schemas';

/** Valores que guarda el backend. Un borrador solo se ve en el panel. */
export const BLOG_STATUSES = BlogStatusSchema.options;

export const BLOG_STATUS_LABELS: Record<TBlogStatus, string> = {
  published: 'Publicado',
  draft: 'Borrador',
};

/** Orden del selector "Estado" del formulario: borrador primero, como en el panel de referencia. */
export const BLOG_STATUS_OPTIONS: readonly TBlogStatus[] = ['draft', 'published'];
