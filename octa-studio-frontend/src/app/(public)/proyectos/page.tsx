import type { Metadata } from 'next';
import { Projects } from '@/components/projects/portfolio/Projects';

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Una selección de los stands y montajes que hemos producido para marcas nacionales e internacionales.',
};

export default async function ProyectosPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  return (
    <>
      <Projects page={Number(page) || 1} />
    </>
  );
}
