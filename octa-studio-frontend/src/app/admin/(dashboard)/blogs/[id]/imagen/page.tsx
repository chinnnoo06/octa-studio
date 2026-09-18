import type { Metadata } from 'next';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { BackButtonLeft } from '@/components/ui/buttons/BackButtonLeft';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EditBlogImage } from '@/components/blogs/images/EditBlogImage';
import { getBlogByIdService } from '@/services/server/blogs.service';

export const metadata: Metadata = { title: 'Imagen del blog' };

export default async function ImagenBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const blog = await getBlogByIdService(id);

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Actualiza la imagen</Eyebrow>
          <SectionTitle lead="Imagen del" rotating="Blog" as='h1' />
        </div>

        <div className="hidden xl:flex">
          <BackButtonLeft />
        </div>

        <div className="flex xl:hidden">
          <BackButton />
        </div>
      </div>

      <EditBlogImage blog={blog} />
    </section>
  );
}
