import type { TBlog } from '@/schemas/blog/blog.schemas';
import type { TBreadcrumbItem } from '@/types/common.types';

/** Ruta de la pagina de una categoria del blog. */
export const blogCategoryPath = (slug: string) => `/blogs/categoria/${slug}`;

/** Blog › [Categoría] › Título: lo comparten la miga visible y la del JSON-LD. */
export const blogBreadcrumb = (blog: Pick<TBlog, 'title' | 'slug' | 'category'>): TBreadcrumbItem[] => [
  { name: 'Blog', path: '/blogs' },
  ...(blog.category ? [{ name: blog.category.name, path: blogCategoryPath(blog.category.slug) }] : []),
  { name: blog.title, path: `/blogs/${blog.slug}` },
];
