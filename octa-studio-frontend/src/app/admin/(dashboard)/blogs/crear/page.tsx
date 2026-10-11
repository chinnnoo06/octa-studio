import type { Metadata } from 'next';
import { CreateBlogForm } from '@/components/blogs/form/CreateBlogForm';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { BackButtonLeft } from '@/components/ui/buttons/BackButtonLeft';

export const metadata: Metadata = { title: 'Crear blog' };

export default function CrearBlogPage() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Agrega un nuevo blog</Eyebrow>
          <SectionTitle lead="Crear" rotating="Blog" as='h1' />
        </div>

        <div className="hidden xl:flex">
          <BackButtonLeft />
        </div>

        <div className="flex xl:hidden">
          <BackButton />
        </div>
      </div>

      <CreateBlogForm />
    </section>
  );
}
