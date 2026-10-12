import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/ui/layout/AdminHeading';
import { EditBlogForm } from '@/components/blogs/form/EditBlogForm';
import { getBlogByIdService } from '@/services/server/blog.service';
import { getBlogCategoriesService } from '@/services/server/blogCategory.service';

export const metadata: Metadata = { title: 'Editar Entrada de Blog' };

export default async function EditarBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [blog, categories] = await Promise.all([getBlogByIdService(id), getBlogCategoriesService()]);

  if (!blog) notFound();

  return (
    <section className="w-full">
      <AdminHeading title="Editar Entrada de Blog" subtitle="Edita el contenido del blog y actualiza su estado." actions={<><BackButton /><FormSubmitButton>Guardar cambios</FormSubmitButton></>} narrow />

      <EditBlogForm blog={blog} categories={categories} />
    </section>
  );
}
