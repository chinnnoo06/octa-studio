import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { BackButtonLeft } from '@/components/ui/buttons/BackButtonLeft';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EditTestimonialImage } from '@/components/testimonials/images/EditTestimonialImage';
import { getTestimonialService } from '@/services/server/testimonials.service';

export const metadata: Metadata = { title: 'Imagen del testimonio' };

export default async function ImagenTestimonioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const testimonial = await getTestimonialService(id);

  if (!testimonial) notFound();

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Actualiza la imagen</Eyebrow>
          <SectionTitle lead="Imagen del" rotating="Testimonio" as='h1' />
        </div>

        <div className="hidden xl:flex">
          <BackButtonLeft />
        </div>

        <div className="flex xl:hidden">
          <BackButton />
        </div>
      </div>

      <EditTestimonialImage testimonial={testimonial} />
    </section>
  );
}
