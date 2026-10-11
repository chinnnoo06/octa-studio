import type { Metadata } from 'next';
import { CreateBlogForm } from '@/components/blogs/form/CreateBlogForm';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/ui/layout/AdminHeading';

export const metadata: Metadata = { title: 'Crear blog' };

export default function CrearBlogPage() {
  return (
    <section className="w-full">
      <AdminHeading title="Crear blog" subtitle="Redacta una nueva entrada de blog y configura su SEO." actions={<><BackButton /><FormSubmitButton>Crear blog</FormSubmitButton></>} narrow />

      <CreateBlogForm />
    </section>
  );
}
