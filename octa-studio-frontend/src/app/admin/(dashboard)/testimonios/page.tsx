import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TestimonialsTable } from '@/components/testimonials/TestimonialsTable';
import { getTestimonialsService } from '@/services/server/testimonials.service';

export default async function AdminTestimoniosPage() {
  const testimonials = await getTestimonialsService()

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Administra los testimonios</Eyebrow>
          <SectionTitle lead="Nuestros" rotating="Testimonios" as='h1' />
        </div>

        <PrimaryButton href="/admin/testimonios/crear">Agregar testimonio</PrimaryButton>
      </div>

      <TestimonialsTable testimonials={testimonials} />

    </section>
  );
}
