import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { LinkButtonLeft } from '@/components/ui/buttons/LinkButtonLeft';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default async function DetalleBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Consulta el blog</Eyebrow>
          <SectionTitle lead="Detalle del" rotating="Blog" as='h1' />
        </div>

        <div className="hidden xl:flex">
          <LinkButtonLeft href={`/admin/blogs/${id}/editar`}>Editar blog</LinkButtonLeft>
        </div>

        <div className="flex xl:hidden">
          <LinkButton href={`/admin/blogs/${id}/editar`}>Editar blog</LinkButton>
        </div>
      </div>

      {/* TODO: detalle del blog */}
    </section>
  );
}
