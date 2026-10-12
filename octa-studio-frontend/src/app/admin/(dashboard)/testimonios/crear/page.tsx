import type { Metadata } from 'next';
import { CreateTestimonialForm } from '@/components/testimonials/form/CreateTestimonialForm';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/ui/layout/AdminHeading';

export const metadata: Metadata = { title: 'Crear Testimonio' };

export default function CrearTestimonioPage() {
  return (
    <section className="w-full">
      <AdminHeading title="Crear Testimonio" subtitle="Agrega la opinión de un cliente con el logo de su empresa." actions={<><BackButton /><FormSubmitButton>Crear testimonio</FormSubmitButton></>} narrow />

      <CreateTestimonialForm />
    </section>
  );
}
