import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { AdminHeading } from '@/components/admin/layout/AdminHeading';
import { TableToolbar } from '@/components/admin/ui/table/TableToolbar';
import { TablePagination } from '@/components/admin/ui/table/TablePagination';
import { BlogsTable } from '@/components/admin/dashboard/blogs/table/BlogsTable';
import { getAdminBlogsService } from '@/services/server/blog.service';
import { BLOG_STATUS_LABELS, BLOG_STATUS_OPTIONS } from '@/utils/data/blogs';
import { getBlogCategoriesService } from '@/services/server/blogCategory.service';
import { pickParams } from '@/utils/admin/queryString';
import { isFilteredList } from '@/utils/admin/tableFilters';
import type { TFilterField } from '@/types/common.types';

const BASE_PATH = '/admin/blogs';

const PARAM_KEYS = ['page', 'search', 'category', 'status', 'from', 'to', 'sort', 'order'] as const;

export const metadata: Metadata = { title: 'Blogs' };

export default async function AdminBlogsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = pickParams(await searchParams, PARAM_KEYS);

  const [{ blogs, pagination }, categories] = await Promise.all([
    getAdminBlogsService(params),
    getBlogCategoriesService(),
  ]);

  // Las categorias salen de la base: se crean y editan en "Categorías Blog".
  const filters: TFilterField[] = [
    {
      type: 'select',
      name: 'status',
      label: 'Estado',
      options: BLOG_STATUS_OPTIONS.map((status) => ({ value: status, label: BLOG_STATUS_LABELS[status] })),
    },
    {
      type: 'select',
      name: 'category',
      label: 'Categoría',
      options: categories.map((category) => ({ value: category._id, label: category.name })),
    },
    { type: 'dates' },
  ];

  // Una pagina que ya no existe (p. ej. tras borrar) vuelve a la primera con los mismos filtros.
  if (pagination.totalPages > 0 && Number(params.page ?? 1) > pagination.totalPages) {
    redirect(BASE_PATH);
  }

  const filtered = isFilteredList(filters, params);

  return (
    <section>
      <AdminHeading title="Blogs" />

      <TableToolbar
        basePath={BASE_PATH}
        params={params}
        searchPlaceholder="Buscar por título o extracto..."
        filters={filters}
        addHref={`${BASE_PATH}/crear`}
        addLabel="Nuevo blog"
      />

      <BlogsTable blogs={blogs} basePath={BASE_PATH} params={params} filtered={filtered} />

      <TablePagination pagination={pagination} basePath={BASE_PATH} params={params} />
    </section>
  );
}
