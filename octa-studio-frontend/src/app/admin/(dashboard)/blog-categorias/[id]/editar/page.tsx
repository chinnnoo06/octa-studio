import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/ui/layout/AdminHeading';
import { EditBlogCategoryForm } from '@/components/blogCategories/form/EditBlogCategoryForm';
import { getBlogCategoryByIdService } from '@/services/server/blogCategory.service';

export const metadata: Metadata = { title: 'Editar Categoría de Blog' };

export default async function EditarBlogCategoriaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const category = await getBlogCategoryByIdService(id);

  if (!category) notFound();

  return (
    <section className="w-full">
      <AdminHeading title="Editar Categoría de Blog" subtitle="Actualiza los datos de la categoría de blog." actions={<><BackButton /><FormSubmitButton>Guardar cambios</FormSubmitButton></>} narrow />

      <EditBlogCategoryForm category={category} />
    </section>
  );
}
