import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/ui/layout/AdminHeading';
import { EditTestimonialImageForm } from '@/components/testimonials/form/images/EditTestimonialImageForm';
import { getTestimonialService } from '@/services/server/testimonial.service';

export const metadata: Metadata = { title: 'Imagen del testimonio' };

export default async function ImagenTestimonioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const testimonial = await getTestimonialService(id);

  if (!testimonial) notFound();

  return (
    <section className="w-full">
      <AdminHeading title="Imagen del testimonio" subtitle="Reemplaza el logo o la foto de la empresa." actions={<><BackButton /><FormSubmitButton>Reemplazar imagen</FormSubmitButton></>} narrow />

      <EditTestimonialImageForm testimonial={testimonial} />
    </section>
  );
}
