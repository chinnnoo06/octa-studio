import Image from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnLoad } from '@/components/ui/Reveal';
import { fadeBlur } from '@/utils/motion/reveal';
import { BannerLogo } from './BannerLogo';
import ImgBadge from '@/assets/media/about/ImgBadgeStack.png';

export const Hero = () => {
  return (
    <section data-section="about-hero" className="bg-primary py-20 lg:py-25">
      <div className="flex flex-col gap-10 lg:gap-20">

        <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
          <div className="flex gap-10">

            {/* La insignia solo existe en desktop, igual que en la referencia. */}
            <RevealOnLoad
              variants={fadeBlur}
              className="hidden shrink-0 items-center gap-5 lg:flex"
            >
              <Image
                src={ImgBadge}
                alt="Reconocimientos de Octa Studio"
                sizes="80px"
                className="h-60 w-20 object-contain"
              />

              <p className="flex h-60 flex-col items-start gap-2.5">
                <span className="text-secondary text-4xl font-semibold lg:text-[2.5rem] lg:leading-[1.2]">
                  20+
                </span>
                <span className="text-secondary text-base font-semibold tracking-[0.1em] uppercase [writing-mode:vertical-rl]">
                  Años
                </span>
              </p>
            </RevealOnLoad>

            <RevealOnLoad
              variants={fadeBlur}
              delay={0.15}
              className="flex flex-1 flex-col gap-5 lg:gap-15"
            >
              <SectionTitle as="h1" size="hero" lead="Sobre" rotating="nosotros" />

              <div className="flex flex-col gap-5">
                <h2 className="text-fourth hidden text-2xl font-bold uppercase leading-[1.25] tracking-[-0.02em] md:block lg:text-3xl">
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

        {/* A pantalla completa desde `lg`, dentro del contenedor por debajo. */}
        <div className="px-5 lg:px-0">
          <BannerLogo />
        </div>
      </div>
    </section>
  );
};
