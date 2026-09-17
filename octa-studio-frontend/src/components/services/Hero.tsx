import { HiArrowDown } from 'react-icons/hi2';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnLoad } from '@/components/ui/Reveal';
import { BannerLogo } from '@/components/sections/BannerLogo';
import { fadeBlur } from '@/utils/motion/reveal';
import { SERVICES } from '@/utils/data/services';
import ImgBanner from '@/assets/media/backgrounds/ImgBackground2.webp';

export const Hero = () => {
  return (
    <section data-section="services-hero" className="bg-primary pt-15 lg:pt-20">
      <div className="flex flex-col gap-15 lg:gap-20">
        <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
          <div className="flex gap-10">
            <RevealOnLoad variants={fadeBlur} className="flex flex-1 flex-col gap-10">
              <SectionTitle as="h1" size="hero" lead="Nuestros" rotating="servicios" />

              <div className="flex flex-col gap-5">
                <h2 className="text-secondary text-2xl font-bold uppercase leading-[1.2] lg:text-3xl">
                  Diseño, fabricación, montaje y desmontaje con equipo propio, de la primera
                  reunión al cierre del evento.
                </h2>

                <p className="text-fourth/75 text-base lg:text-lg">
                  No necesitas coordinar a varios proveedores: el mismo equipo que dibuja el
                  stand es el que lo fabrica, lo monta y lo retira.
                </p>
              </div>
            </RevealOnLoad>

            <RevealOnLoad
              variants={fadeBlur}
              className="hidden shrink-0 flex-col justify-end lg:flex lg:w-90"
            >
              <ol className="flex flex-col">
                {SERVICES.map((service) => (
                  <li key={service.icon} className="border-fourth/30 border-t last:border-b">
                    <a
                      href={service.href}
                      className="group text-secondary hover:bg-secondary/15 flex items-center gap-5 p-5 transition-colors duration-300"
                    >
                      <span className="text-base lg:text-lg font-medium">{service.number}</span>

                      <span className="flex-1 font-gentleman text-4xl lg:text-5xl p-1.5 leading-[0.7] font-normal tracking-[0.04em] normal-case">{service.title}</span>

                      <HiArrowDown
                        aria-hidden="true"
                        className="size-4 lg:size-4.5 shrink-0 stroke-1 transition-transform duration-300 group-hover:translate-y-1"
                      />
                    </a>
                  </li>
                ))}
              </ol>
            </RevealOnLoad>
          </div>
        </div>

        <BannerLogo image={ImgBanner}/>
      </div>
    </section>
  );
};
