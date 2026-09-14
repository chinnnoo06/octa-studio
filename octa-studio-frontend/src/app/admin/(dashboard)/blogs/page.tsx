import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';

export default function AdminBlogsPage() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <h1 className="text-secondary text-2xl font-semibold uppercase lg:text-3xl">Blogs</h1>
        <PrimaryButton href="/admin/blogs/crear">Agregar blog</PrimaryButton>
      </div>

      {/* TODO: listado de blogs */}
    </section>
  );
}
