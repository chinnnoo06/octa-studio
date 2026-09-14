import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default async function EditarBlogPage({ params }: { params: Promise<{ id: string }> }) {
  await params;

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <div className="text-secondary flex flex-col gap-2.5">
        <Eyebrow>Edita el blog</Eyebrow>
        <SectionTitle lead="Editar" rotating="Blog" as='h1' />
      </div>

      {/* TODO: formulario de edicion */}
    </section>
  );
}
