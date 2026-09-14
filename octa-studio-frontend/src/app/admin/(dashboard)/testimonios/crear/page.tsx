import { CreateTestimonial } from '@/components/testimonials/CreateTestimonial';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default function CrearTestimonioPage() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <div className="text-secondary flex flex-col gap-2.5">
        <Eyebrow>Agrega un nuevo testimonio</Eyebrow>
        <SectionTitle lead="Crear" rotating="Testimonio" as='h1' />
      </div>

      <CreateTestimonial />
    </section>
  );
}
