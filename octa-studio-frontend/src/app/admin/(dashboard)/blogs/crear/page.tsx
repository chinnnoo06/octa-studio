import { CreateBlogForm } from '@/components/blogs/CreateBlogForm';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default function CrearBlogPage() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <div className="text-secondary flex flex-col gap-2.5">
        <Eyebrow>Agrega un nuevo blog</Eyebrow>
        <SectionTitle lead="Crear" rotating="Blog" as='h1' />
      </div>

      <CreateBlogForm />
    </section>
  );
}
