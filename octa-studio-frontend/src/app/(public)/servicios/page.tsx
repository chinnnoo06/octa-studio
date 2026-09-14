import type { Metadata } from 'next';
import { Services } from '@/components/servicios/services/Services';

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Diseño, fabricación, montaje y desmontaje de stands, eventos masivos y congresos con equipo propio.',
};

export default async function ServiciosPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  return (
    <>
      <Services page={Number(page) || 1} />
    </>
  );
}
