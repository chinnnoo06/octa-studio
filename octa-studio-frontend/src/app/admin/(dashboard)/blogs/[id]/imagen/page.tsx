import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/ui/layout/AdminHeading';
import { EditBlogImageForm } from '@/components/blogs/form/images/EditBlogImageForm';
import { getBlogByIdService } from '@/services/server/blog.service';

export const metadata: Metadata = { title: 'Imagen del blog' };

export default async function ImagenBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const blog = await getBlogByIdService(id);

  if (!blog) notFound();

  return (
    <section className="w-full">
      <AdminHeading title="Imagen del blog" subtitle="Reemplaza la imagen destacada de la entrada." actions={<><BackButton /><FormSubmitButton>Reemplazar imagen</FormSubmitButton></>} narrow />

      <EditBlogImageForm blog={blog} />
    </section>
  );
}
