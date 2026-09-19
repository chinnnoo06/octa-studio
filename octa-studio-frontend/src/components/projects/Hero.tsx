import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnLoad } from '@/components/ui/Reveal';
import { BannerLogo } from '@/components/sections/BannerLogo';
import { fadeBlur } from '@/utils/motion/reveal';
import ImgBanner from '@/assets/media/backgrounds/ImgBackground5.webp';

export const Hero = () => {
  return (
    <section data-section="projects-hero" className="bg-primary pt-20 lg:pt-30">
      <div className="flex flex-col gap-20 lg:gap-30">
        <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
          <div className="flex gap-10">
            <RevealOnLoad
              variants={fadeBlur}
              className="hidden shrink-0 items-center lg:flex"
            >
              <p className="flex h-60 flex-col items-start gap-2.5">
                <span className="text-secondary text-6xl lg:text-7xl font-medium">500+</span>
                <span className="text-secondary font-gentleman text-5xl lg:text-6xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
                  Stands
                </span>
              </p>
            </RevealOnLoad>

            <RevealOnLoad variants={fadeBlur} className="flex flex-1 flex-col gap-10">
              <SectionTitle as="h1" size="hero" lead="Nuestros" rotating="proyectos" />

              <div className="flex flex-col gap-5">
                <h2 className="text-secondary text-2xl font-bold uppercase leading-[1.2] lg:text-3xl">
                  Stands, escenarios y montajes que ya estuvieron en el recinto.
                </h2>

                <p className="text-fourth/75 text-base lg:text-lg">
                  Más de 20 años montando stands para marcas nacionales e internacionales.
                  Cada proyecto nace desde cero, adaptado al espacio, los productos y el
                  presupuesto de cada cliente.
                </p>
              </div>
            </RevealOnLoad>
          </div>
        </div>

        <BannerLogo image={ImgBanner} />
      </div>
    </section>
  );
};
