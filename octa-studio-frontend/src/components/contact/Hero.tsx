import { HiArrowDown } from 'react-icons/hi2';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnLoad } from '@/components/ui/Reveal';
import { BannerLogo } from '@/components/sections/BannerLogo';
import { fadeBlur } from '@/utils/motion/reveal';
import { CHANNELS } from '@/utils/data/contact';
import ImgBanner from '@/assets/media/backgrounds/ImgBackground7.webp';

export const Hero = () => {
  return (
    <section data-section="contact-hero" className="bg-primary pt-20 lg:pt-30">
      <div className="flex flex-col gap-20 lg:gap-30">
        <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
            <RevealOnLoad variants={fadeBlur} className="flex flex-1 flex-col gap-10">
              <SectionTitle as="h1" size="hero" lead="Contacta con" rotating="nosotros" />

              <div className="flex flex-col gap-5">
                <h2 className="text-secondary text-2xl font-bold uppercase leading-[1.2] lg:text-3xl">
                  Llámanos, escríbenos por WhatsApp o mándanos un correo.
                </h2>

                <p className="text-fourth/75 text-base lg:text-lg">
                  Cotizamos stands, eventos y congresos en Guadalajara, Monterrey, Ciudad de
                  México, todo el país y Estados Unidos. Cuéntanos fecha, recinto y metros, y te devolvemos
                  propuesta, tiempos y presupuesto.
                </p>
              </div>
            </RevealOnLoad>
        </div>

        <BannerLogo image={ImgBanner} className="object-left lg:object-center" />
      </div>
    </section>
  );
};
