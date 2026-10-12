import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EditTestimonialForm } from '@/components/admin/dashboard/testimonials/form/EditTestimonialForm';
import { getTestimonialService } from '@/services/server/testimonial.service';
import { BackButton } from '@/components/admin/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/admin/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/admin/layout/AdminHeading';

export const metadata: Metadata = { title: 'Editar Testimonio' };

export default async function EditarTestimonioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const testimonial = await getTestimonialService(id);

  if (!testimonial) notFound();

  return (
    <section className="w-full">
      <AdminHeading title="Editar Testimonio" subtitle="Edita el testimonio, su valoración y el logo de la empresa." actions={<><BackButton /><FormSubmitButton>Guardar cambios</FormSubmitButton></>} narrow />

      <EditTestimonialForm testimonial={testimonial} />
    </section>
  );
}
