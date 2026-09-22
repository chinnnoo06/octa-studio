import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnLoad } from '@/components/ui/Reveal';
import { fadeBlur } from '@/utils/motion/reveal';
import { StandStack } from './StandStack';
import { BannerLogo } from '@/components/sections/BannerLogo';
import ImgBanner from '@/assets/media/backgrounds/ImgBackground1.webp';


export const Hero = () => {
  return (
    <section data-section="about-hero" className="bg-primary pt-20 lg:pt-25">
      <div className="flex flex-col gap-20 lg:gap-25">
        <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
          <div className="flex gap-10">
            <RevealOnLoad
              variants={fadeBlur}
              className="hidden shrink-0 items-center gap-5 lg:flex"
            >
              <StandStack />

              <p className="flex h-60 flex-col items-start gap-2.5">
                <span className="text-secondary text-6xl lg:text-7xl font-semibold">
                  20+
                </span>
                <span className="text-secondary font-gentleman text-5xl lg:text-6xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
                  Años
                </span>
              </p>
            </RevealOnLoad>

            <RevealOnLoad variants={fadeBlur} className="flex flex-1 flex-col gap-10">
              <SectionTitle as="h1" size="hero" lead="Sobre" rotating="nosotros" />

              <div className="flex flex-col gap-5">
                <h2 className="text-secondary text-2xl font-bold uppercase leading-[1.2] lg:text-3xl">
                  Diseñamos, fabricamos y montamos el stand completo, desde la primera idea
                  hasta que el recinto queda vacío.
                </h2>

                <p className="text-fourth/75 text-base lg:text-lg">
                  Somos una empresa dedicada al diseño y montaje de stands, shows, eventos
                  masivos, congresos y convenciones a nivel nacional e internacional. Veinte
                  años montando con equipo propio, sin repartir el proyecto entre proveedores.
                </p>
              </div>
            </RevealOnLoad>
          </div>
        </div>

        <BannerLogo image={ImgBanner} className="object-left lg:object-center" />

      </div>
    </section>
  );
};
