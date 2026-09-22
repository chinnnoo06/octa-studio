import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnLoad } from '@/components/ui/Reveal';
import { BannerLogo } from '@/components/sections/BannerLogo';
import { fadeBlur } from '@/utils/motion/reveal';
import ImgBanner from '@/assets/media/backgrounds/ImgBackground6.webp';

export const Hero = () => {
  return (
    <section data-section="blogs-hero" className="bg-primary pt-20 lg:pt-25">
      <div className="flex flex-col gap-20 lg:gap-25">
        <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
          <RevealOnLoad variants={fadeBlur} className="flex flex-col gap-10">
            <SectionTitle as="h1" size="hero" lead="Nuestro" rotating="blog" />

            <div className="flex flex-col gap-5">
              <h2 className="text-secondary text-2xl font-bold uppercase leading-[1.2] lg:text-3xl">
                Lo que aprendimos montando, contado para quien va a exponer.
              </h2>

              <p className="text-fourth/75 max-w-5xl text-base lg:text-lg">
                Cómo se decide el tamaño de un stand, qué revisar en el render antes de
                fabricar y por qué los tiempos de recinto mandan sobre todo lo demás.
              </p>
            </div>
          </RevealOnLoad>
        </div>

        <BannerLogo image={ImgBanner} className="object-left lg:object-center" />
      </div>
    </section>
  );
};
