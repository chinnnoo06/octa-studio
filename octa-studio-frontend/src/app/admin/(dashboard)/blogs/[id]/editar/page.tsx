import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { BackButtonLeft } from '@/components/ui/buttons/BackButtonLeft';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EditBlogForm } from '@/components/blogs/form/EditBlogForm';
import { getBlogByIdService } from '@/services/server/blogs.service';

export const metadata: Metadata = { title: 'Editar blog' };

export default async function EditarBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const blog = await getBlogByIdService(id);

  if (!blog) notFound();

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Edita el blog</Eyebrow>
          <SectionTitle lead="Editar" rotating="Blog" as='h1' />
        </div>

        <div className="hidden xl:flex">
          <BackButtonLeft />
        </div>

        <div className="flex xl:hidden">
          <BackButton />
        </div>
      </div>

      <EditBlogForm blog={blog} />
    </section>
  );
}
