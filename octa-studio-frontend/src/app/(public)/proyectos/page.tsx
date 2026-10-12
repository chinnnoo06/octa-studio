import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { Hero } from '@/components/projects/Hero';
import { Projects } from '@/components/projects/Projects';
import { getProjectsService } from '@/services/server/project.service';

export const metadata: Metadata = {
  title: 'Proyectos de stands y montajes',
  description: 'Portafolio de stands, escenarios y montajes que hemos diseñado, fabricado e instalado para marcas nacionales e internacionales en expos y congresos.',
  alternates: { canonical: '/proyectos' },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    url: '/proyectos',
    title: 'Proyectos de stands y montajes | Octa Building Studio',
    description: 'Portafolio de stands, escenarios y montajes que hemos diseñado, fabricado e instalado para marcas nacionales e internacionales en expos y congresos.',
  },
  twitter: {
    ...SHARED_TWITTER,
    title: 'Proyectos de stands y montajes | Octa Building Studio',
    description: 'Portafolio de stands, escenarios y montajes que hemos diseñado, fabricado e instalado para marcas nacionales e internacionales en expos y congresos.',
  },
};

export default async function ProyectosPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  // Cualquier cosa que no sea un entero positivo cae en la 1.
  const requested = Number(page);
  const current = Number.isInteger(requested) && requested > 0 ? requested : 1;

  const { projects, pagination } = await getProjectsService(current);

  // Una pagina que no existe vuelve a la primera en vez de pintar vacio.
  if (pagination.totalPages > 0 && current > pagination.totalPages) {
    redirect('/proyectos#portafolio');
  }

  return (
    <>
      <BreadcrumbStructuredData items={[{ name: 'Proyectos', path: '/proyectos' }]} />
      <Hero />
      <Projects projects={projects} pagination={pagination} />
    </>
  );
}
