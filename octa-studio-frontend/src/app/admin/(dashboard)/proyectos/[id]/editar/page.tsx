import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default async function EditarProyectoPage({ params }: { params: Promise<{ id: string }> }) {
  await params;

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <div className="text-secondary flex flex-col gap-2.5">
        <Eyebrow>Edita el proyecto</Eyebrow>
        <SectionTitle lead="Editar" rotating="Proyecto" as='h1' />
      </div>

      {/* TODO: formulario de edicion */}
    </section>
  );
}
