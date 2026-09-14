import { PrimaryButtonLeft } from '@/components/ui/buttons/PrimaryButtonLeft';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default async function DetalleProyectoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Consulta el proyecto</Eyebrow>
          <SectionTitle lead="Detalle del" rotating="Proyecto" as='h1' />
        </div>

        <PrimaryButtonLeft href={`/admin/proyectos/${id}/editar`}>Editar proyecto</PrimaryButtonLeft>
      </div>

      {/* TODO: detalle del proyecto */}
    </section>
  );
}
