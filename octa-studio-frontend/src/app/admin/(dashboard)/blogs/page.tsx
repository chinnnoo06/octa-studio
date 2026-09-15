import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { LinkButtonLeft } from '@/components/ui/buttons/LinkButtonLeft';
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

        <div className="hidden xl:flex">
          <LinkButtonLeft href={`/admin/blogs/crear`}>Crear blog</LinkButtonLeft>
        </div>

        <div className="flex xl:hidden">
          <LinkButton href={`/admin/blogs/crear`}>Crear blog</LinkButton>
        </div>
      </div>

      {/* TODO: listado de blogs */}
    </section>
  );
}
