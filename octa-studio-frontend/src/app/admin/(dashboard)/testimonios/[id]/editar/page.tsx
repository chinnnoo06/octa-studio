import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EditTestimonialForm } from '@/components/testimonials/form/EditTestimonialForm';
import { getTestimonialService } from '@/services/server/testimonials.service';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { BackButtonLeft } from '@/components/ui/buttons/BackButtonLeft';

export const metadata: Metadata = { title: 'Editar testimonio' };

export default async function EditarTestimonioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const testimonial = await getTestimonialService(id);

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Edita el testimonio</Eyebrow>
          <SectionTitle lead="Editar" rotating="Testimonio" as='h1' />
        </div>

        <div className="hidden xl:flex">
          <BackButtonLeft />
        </div>

        <div className="flex xl:hidden">
          <BackButton />
        </div>
      </div>

      <EditTestimonialForm testimonial={testimonial} />
    </section>
  );
}
