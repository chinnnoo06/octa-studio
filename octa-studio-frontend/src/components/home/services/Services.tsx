import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { WipeHeading } from '@/components/ui/WipeHeading';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { Reveal } from '@/components/ui/Reveal';
import { ServiceCard } from './ServiceCard';
import { SERVICES } from '@/utils/data/services';
import { fadeUpScale } from '@/utils/motion/reveal';
import Img from '@/assets/media/stands/ImgStand12.webp';

export const Services = () => {
  return (
    <section data-section="services" className="bg-primary py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="border-fourth/30 flex flex-col gap-10 border-t pt-10 lg:flex-row">
          <div className="text-secondary flex w-full flex-col gap-10 lg:w-1/2">
            <Eyebrow>Nuestros Servicios</Eyebrow>

            <Reveal variants={fadeUpScale} className="overflow-hidden rounded-xl">
              <Image
                src={Img}
                alt="Montaje de un stand en feria"
                sizes="(min-width: 1820px) 770px, (min-width: 1024px) calc(50vw - 80px), calc(100vw - 40px)"
                quality={90}
                className="h-100 lg:h-110 w-full object-cover"
              />
            </Reveal>
          </div>

          <div className="border-fourth/30 flex justify-center w-full flex-col gap-5 lg:w-1/2 lg:border-l lg:pl-10">
            <WipeHeading text="Tú lo imaginas, nosotros lo creamos" />

            <p className="text-fourth/75 text-base lg:text-lg">
              No necesitas coordinar a varios proveedores. Diseñamos, fabricamos y producimos
              tu proyecto con el mismo equipo, desde la primera reunión hasta que cierra el
              evento, también tenemos otros servicios.
            </p>

            <PrimaryButton href="/servicios">Ver todo lo que hacemos</PrimaryButton>
          </div>
        </div>

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-5 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.href}
              delay={i * 0.1}
              className="w-75 shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
