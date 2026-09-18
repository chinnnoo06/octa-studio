import type { Metadata } from 'next';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { LinkButtonLeft } from '@/components/ui/buttons/LinkButtonLeft';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const metadata: Metadata = { title: 'Detalle del proyecto' };

export default async function DetalleProyectoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Consulta el proyecto</Eyebrow>
          <SectionTitle lead="Detalle del" rotating="Proyecto" as='h1' />
        </div>

        <div className="hidden xl:flex">
          <LinkButtonLeft href={`/admin/proyectos/${id}/editar`}>Editar proyecto</LinkButtonLeft>
        </div>

        <div className="flex xl:hidden">
          <LinkButton href={`/admin/proyectos/${id}/editar`}>Editar proyecto</LinkButton>
        </div>
      </div>

      {/* TODO: detalle del proyecto */}
    </section>
  );
}
