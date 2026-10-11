import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { AdminHeading } from '@/components/ui/layout/AdminHeading';
import { TableToolbar } from '@/components/ui/table/TableToolbar';
import { TablePagination } from '@/components/ui/table/TablePagination';
import { ProjectsTable } from '@/components/projects/table/ProjectsTable';
import { getAdminProjectsService } from '@/services/server/project.service';
import { pickParams } from '@/utils/queryString';
import { isFilteredList } from '@/utils/tableFilters';
import type { TFilterField } from '@/types/common.types';

const BASE_PATH = '/admin/proyectos';

const PARAM_KEYS = ['page', 'search', 'sector', 'from', 'to', 'sort', 'order'] as const;

export const metadata: Metadata = { title: 'Proyectos' };

export default async function AdminProyectosPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = pickParams(await searchParams, PARAM_KEYS);

  const { projects, pagination, sectors } = await getAdminProjectsService(params);

  if (pagination.totalPages > 0 && Number(params.page ?? 1) > pagination.totalPages) {
    redirect(BASE_PATH);
  }

  // Los sectores salen de los proyectos que existen, no de una lista fija.
  const filters: TFilterField[] = [
    { type: 'select', name: 'sector', label: 'Sector', options: sectors.map((sector) => ({ value: sector, label: sector })) },
    { type: 'dates' },
  ];

  return (
    <section>
      <AdminHeading title="Proyectos" />

      <TableToolbar
        basePath={BASE_PATH}
        params={params}
        searchPlaceholder="Buscar por nombre, descripción o sector..."
        filters={filters}
        addHref={`${BASE_PATH}/crear`}
        addLabel="Nuevo proyecto"
      />

      <ProjectsTable projects={projects} basePath={BASE_PATH} params={params} filtered={isFilteredList(filters, params)} />

      <TablePagination pagination={pagination} basePath={BASE_PATH} params={params} />
    </section>
  );
}
