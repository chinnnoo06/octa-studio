import type { Metadata } from 'next';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/ui/layout/AdminHeading';
import { CreateBlogCategoryForm } from '@/components/blogCategories/form/CreateBlogCategoryForm';

export const metadata: Metadata = { title: 'Crear Categoría de Blog' };

export default function CrearBlogCategoriaPage() {
  return (
    <section className="w-full">
      <AdminHeading title="Crear Categoría de Blog" subtitle="Crea una categoría para organizar las entradas del blog." actions={<><BackButton /><FormSubmitButton>Crear categoría</FormSubmitButton></>} narrow />

      <CreateBlogCategoryForm />
    </section>
  );
}
