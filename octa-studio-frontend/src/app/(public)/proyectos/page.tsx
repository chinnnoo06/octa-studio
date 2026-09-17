import { pageMetadata } from '@/utils/metadata';
import { Hero } from '@/components/projects/Hero';
import { Projects } from '@/components/projects/Projects';

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

  return (
    <>
      <Hero />
      <Projects page={Number(page) || 1} />
    </>
  );
}
