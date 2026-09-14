import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TestimonialCarousel } from './TestimonialCarousel';
import { Reveal } from '@/components/ui/Reveal';
import { fadeBlur } from '@/utils/motion/reveal';
import Img from '@/assets/media/backgrounds/ImgBackground3.webp';

export const Testimonials = () => {
  return (
    <section data-section="testimonials" className="bg-thrird">
      <Reveal
        variants={fadeBlur}
        className="bg-fourth relative flex min-h-[60vh] items-center justify-center overflow-hidden py-20 lg:min-h-screen lg:py-25"
      >
        <Image
          src={Img}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
        />

        <div aria-hidden="true" className="bg-fourth/25 absolute inset-0" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-5 lg:px-15">

          <div className="text-primary flex w-full flex-col items-center gap-5 text-center">
            <Eyebrow>Testimonios</Eyebrow>
            <SectionTitle tone="light" align="center" lead="Lo que nuestros clientes dicen de" rotating="nosotros"/>
          </div>

          <TestimonialCarousel />
        </div>
      </Reveal>
    </section>
  );
}
