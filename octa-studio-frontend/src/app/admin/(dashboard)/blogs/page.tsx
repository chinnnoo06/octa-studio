import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default function AdminBlogsPage() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Administra los blogs</Eyebrow>
          <SectionTitle lead="Nuestros" rotating="Blogs" as='h1' />
        </div>

        <PrimaryButton href="/admin/blogs/crear">Agregar blog</PrimaryButton>
      </div>

      {/* TODO: listado de blogs */}
    </section>
  );
}
