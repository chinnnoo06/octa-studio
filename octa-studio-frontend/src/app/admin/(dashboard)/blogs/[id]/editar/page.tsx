export default async function EditarBlogPage({ params }: { params: Promise<{ id: string }> }) {
  await params;

  return (
    <section className="flex flex-col gap-10">
      <h1 className="text-secondary text-2xl font-semibold uppercase lg:text-3xl">Editar blog</h1>

      {/* TODO: formulario de edicion */}
    </section>
  );
}
