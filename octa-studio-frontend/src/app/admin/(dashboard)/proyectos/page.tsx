import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { LinkButtonLeft } from '@/components/ui/buttons/LinkButtonLeft';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Pagination } from '@/components/ui/Pagination';
import { ProjectsTable } from '@/components/projects/table/ProjectsTable';
import { getProjectsService } from '@/services/server/projects.service';

const BASE_PATH = '/admin/proyectos';

export const metadata: Metadata = { title: 'Proyectos' };

export default async function AdminProyectosPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;

  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const { projects, pagination } = await getProjectsService(current);

  if (pagination.totalPages > 0 && current > pagination.totalPages) {
    redirect(BASE_PATH);
  }

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Administra los proyectos</Eyebrow>
          <SectionTitle lead="Nuestros" rotating="Proyectos" as='h1' />
        </div>

        <div className="hidden xl:flex">
          <LinkButtonLeft href={`${BASE_PATH}/crear`}>Crear proyecto</LinkButtonLeft>
        </div>

        <div className="flex xl:hidden">
          <LinkButton href={`${BASE_PATH}/crear`}>Crear proyecto</LinkButton>
        </div>
      </div>

      <ProjectsTable projects={projects} />

      <Pagination pagination={pagination} basePath={BASE_PATH} />
    </section>
  );
}
