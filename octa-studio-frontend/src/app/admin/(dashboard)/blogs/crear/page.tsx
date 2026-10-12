import type { Metadata } from 'next';
import { CreateBlogForm } from '@/components/admin/dashboard/blogs/form/CreateBlogForm';
import { BackButton } from '@/components/admin/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/admin/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/admin/layout/AdminHeading';
import { getBlogCategoriesService } from '@/services/server/blogCategory.service';

export const metadata: Metadata = { title: 'Crear Nueva Entrada de Blog' };

export default async function CrearBlogPage() {
  const categories = await getBlogCategoriesService();

  return (
    <section className="w-full">
      <AdminHeading title="Crear Nueva Entrada de Blog" subtitle="Redacta una nueva entrada de blog y configura su SEO." actions={<><BackButton /><FormSubmitButton>Crear blog</FormSubmitButton></>} narrow />

      <CreateBlogForm categories={categories} />
    </section>
  );
}
