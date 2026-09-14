import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EditTestimonial } from '@/components/testimonials/EditTestimonial';
import { getTestimonialService } from '@/services/server/testimonials.service';

export default async function EditarTestimonioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const testimonial = await getTestimonialService(id);

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <div className="text-secondary flex flex-col gap-2.5">
        <Eyebrow>Edita el testimonio</Eyebrow>
        <SectionTitle lead="Editar" rotating="Testimonio" as='h1' />
      </div>

      <EditTestimonial testimonial={testimonial}/>
    </section>
  );
}
