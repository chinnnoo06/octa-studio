import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';

export default async function DetalleBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <h1 className="text-secondary text-2xl font-semibold uppercase lg:text-3xl">Detalle del blog</h1>
        <PrimaryButton href={`/admin/blogs/${id}/editar`}>Editar blog</PrimaryButton>
      </div>

      {/* TODO: detalle del blog {id} */}
    </section>
  );
}
