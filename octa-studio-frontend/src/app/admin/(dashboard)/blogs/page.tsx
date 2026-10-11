import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { AdminHeading } from '@/components/ui/layout/AdminHeading';
import { TableToolbar } from '@/components/ui/table/TableToolbar';
import { TablePagination } from '@/components/ui/table/TablePagination';
import { BlogsTable } from '@/components/blogs/table/BlogsTable';
import { getAdminBlogsService } from '@/services/server/blog.service';
import { BLOG_CATEGORIES, BLOG_STATUS_LABELS, BLOG_STATUSES } from '@/utils/data/blogs';
import { pickParams } from '@/utils/queryString';
import { isFilteredList } from '@/utils/tableFilters';
import type { TFilterField } from '@/types/common.types';

const BASE_PATH = '/admin/blogs';

const PARAM_KEYS = ['page', 'search', 'category', 'status', 'from', 'to', 'sort', 'order'] as const;

const FILTERS: TFilterField[] = [
  {
    type: 'select',
    name: 'status',
    label: 'Estado',
    options: BLOG_STATUSES.map((status) => ({ value: status, label: BLOG_STATUS_LABELS[status] })),
  },
  {
    type: 'select',
    name: 'category',
    label: 'Categoría',
    options: BLOG_CATEGORIES.map((category) => ({ value: category, label: category })),
  },
  { type: 'dates' },
];

export const metadata: Metadata = { title: 'Blogs' };

export default async function AdminBlogsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = pickParams(await searchParams, PARAM_KEYS);

  const { blogs, pagination } = await getAdminBlogsService(params);

  // Una pagina que ya no existe (p. ej. tras borrar) vuelve a la primera con los mismos filtros.
  if (pagination.totalPages > 0 && Number(params.page ?? 1) > pagination.totalPages) {
    redirect(BASE_PATH);
  }

  const filtered = isFilteredList(FILTERS, params);

  return (
    <section>
      <AdminHeading title="Blogs" />

      <TableToolbar
        basePath={BASE_PATH}
        params={params}
        searchPlaceholder="Buscar por título, extracto o categoría..."
        filters={FILTERS}
        addHref={`${BASE_PATH}/crear`}
        addLabel="Nuevo blog"
      />

      <BlogsTable blogs={blogs} basePath={BASE_PATH} params={params} filtered={filtered} />

      <TablePagination pagination={pagination} basePath={BASE_PATH} params={params} />
    </section>
  );
}
