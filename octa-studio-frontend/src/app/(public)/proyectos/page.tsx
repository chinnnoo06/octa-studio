import { redirect } from 'next/navigation';
import { pageMetadata } from '@/utils/metadata';
import { Hero } from '@/components/projects/Hero';
import { Projects } from '@/components/projects/Projects';
import { getProjectsService } from '@/services/server/projects.service';

export const metadata = pageMetadata({
  title: 'Proyectos',
  description:
    'Una selección de los stands y montajes que hemos producido para marcas nacionales e internacionales.',
  path: '/proyectos',
});

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
      <Hero />
      <Projects projects={projects} pagination={pagination} />
    </>
  );
}
