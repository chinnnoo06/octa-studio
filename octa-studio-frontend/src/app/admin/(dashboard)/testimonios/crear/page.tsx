import type { Metadata } from 'next';
import { CreateTestimonialForm } from '@/components/admin/dashboard/testimonials/form/CreateTestimonialForm';
import { BackButton } from '@/components/admin/ui/buttons/BackButton';
import { FormSubmitButton } from '@/components/admin/ui/buttons/FormSubmitButton';
import { AdminHeading } from '@/components/admin/layout/AdminHeading';

export const metadata: Metadata = { title: 'Crear Testimonio' };

export default function CrearTestimonioPage() {
  return (
    <section className="w-full">
      <AdminHeading title="Crear Testimonio" subtitle="Agrega la opinión de un cliente con el logo de su empresa." actions={<><BackButton /><FormSubmitButton>Crear testimonio</FormSubmitButton></>} narrow />

      <CreateTestimonialForm />
    </section>
  );
}
