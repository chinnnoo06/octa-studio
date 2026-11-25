import type { TBlog } from '@/schemas/blog/blog.schemas';
import type { TBreadcrumbItem } from '@/types/common.types';

export const blogCategoryPath = (slug: string) => `/blogs/categoria/${slug}`;

export const blogBreadcrumb = (blog: Pick<TBlog, 'title' | 'slug' | 'category'>): TBreadcrumbItem[] => [
  { name: 'Blog', path: '/blogs' },
  ...(blog.category ? [{ name: blog.category.name, path: blogCategoryPath(blog.category.slug) }] : []),
  { name: blog.title, path: `/blogs/${blog.slug}` },
];
