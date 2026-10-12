import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { AdminHeading } from '@/components/admin/layout/AdminHeading';
import { TableToolbar } from '@/components/admin/ui/table/TableToolbar';
import { TablePagination } from '@/components/admin/ui/table/TablePagination';
import { TestimonialsTable } from '@/components/admin/dashboard/testimonials/table/TestimonialsTable';
import { getAdminTestimonialsService } from '@/services/server/testimonial.service';
import { pickParams } from '@/utils/admin/queryString';
import { isFilteredList } from '@/utils/admin/tableFilters';
import type { TFilterField } from '@/types/common.types';

const BASE_PATH = '/admin/testimonios';

const PARAM_KEYS = ['page', 'search', 'rating', 'from', 'to', 'sort', 'order'] as const;

const FILTERS: TFilterField[] = [
  {
    type: 'select',
    name: 'rating',
    label: 'Valoración',
    options: [5, 4, 3, 2, 1, 0].map((n) => ({ value: String(n), label: `${n} ${n === 1 ? 'estrella' : 'estrellas'}` })),
  },
  { type: 'dates' },
];

export const metadata: Metadata = { title: 'Testimonios' };

export default async function AdminTestimoniosPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = pickParams(await searchParams, PARAM_KEYS);

  const { testimonials, pagination } = await getAdminTestimonialsService(params);

  if (pagination.totalPages > 0 && Number(params.page ?? 1) > pagination.totalPages) {
    redirect(BASE_PATH);
  }

  return (
    <section>
      <AdminHeading title="Testimonios" />

      <TableToolbar
        basePath={BASE_PATH}
        params={params}
        searchPlaceholder="Buscar por nombre o testimonio..."
        filters={FILTERS}
        addHref={`${BASE_PATH}/crear`}
        addLabel="Nuevo testimonio"
      />

      <TestimonialsTable testimonials={testimonials} basePath={BASE_PATH} params={params} filtered={isFilteredList(FILTERS, params)} />

      <TablePagination pagination={pagination} basePath={BASE_PATH} params={params} />
    </section>
  );
}
