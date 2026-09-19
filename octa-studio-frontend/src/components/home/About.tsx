import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { STATS } from '@/utils/data/about';
import { Odometer } from '@/components/ui/Odometer';
import { WipeHeading } from '@/components/ui/WipeHeading';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { Reveal } from '@/components/ui/Reveal';
import { fadeUpScale } from '@/utils/motion/reveal';
import Img from "@/assets/media/stands/ImgStand8.webp"

const BOX_VARIANT = {
  one:   'bg-primary sm:bg-secondary/15 max-lg:rounded-xl max-lg:border lg:rounded-tl-xl border-fourth/30',
  two:   'bg-primary sm:bg-transparent max-lg:rounded-xl max-lg:border lg:rounded-tr-xl lg:border-l border-fourth/30',
  three: 'bg-primary sm:bg-transparent max-lg:rounded-xl max-lg:border lg:rounded-b-xl lg:border-t border-fourth/30',
  four:  'bg-primary sm:bg-secondary/15 max-lg:rounded-xl max-lg:border lg:rounded-br-xl lg:border-t lg:border-l border-fourth/30',
} as const;

export const About = () => {
  return (
    <section data-section="about" className="py-20 lg:py-30 bg-thrird">
        <div className="mx-auto max-w-[1700px] px-5 lg:px-15 flex flex-col xl:flex-row gap-10">
          <div className="flex w-full xl:w-1/2 flex-col justify-between gap-10">
            <div className="text-secondary flex flex-col gap-5">
              <div className='flex flex-col gap-.5'>
                <Eyebrow>Sobre Octa Building Studio</Eyebrow>
                <WipeHeading text="Más de 20 años convirtiendo marcas en experiencias" />
              </div>

                <p className="text-fourth/75 text-base lg:text-lg ">
                  Somos una empresa dedicada al diseño y montaje de stands, shows, eventos masivos, congresos y convenciones
                  a nivel nacional e internacional. Acompañamos cada proyecto desde la primera idea hasta el desmontaje.
                </p>
                
                <LinkButton href='/nosotros'>Conoce Octa Building Studio</LinkButton>
            </div>

            <Reveal variants={fadeUpScale} className="rounded-xl overflow-hidden bg-white w-full">
              <Image
                src={Img}
                alt="Imagen del logo de Octa Building Studio"
                sizes="(min-width: 1820px) 770px, (min-width: 1024px) calc(50vw - 80px), calc(100vw - 40px)"
                quality={90}
                className="aspect-4/3 w-full object-cover lg:aspect-auto lg:h-110"
              />
            </Reveal>
          </div>

          <div className="w-full xl:w-1/2 pb-5 sm:pb-0 flex overflow-x-auto overflow-y-hidden sm:overflow-x-hidden sm:grid sm:grid-cols-2 gap-5 lg:gap-0">
            {STATS.map((s) => (
              <div key={s.label} className={`w-60 sm:w-full flex flex-col items-end justify-end p-2.5 sm:p-5 lg:p-10 shrink-0 ${BOX_VARIANT[s.variant]}`}  >
                <div className="flex flex-col items-end justify-end gap-2.5 w-full h-full">
                  <Odometer values={s.odometer} suffix={s.suffix} />
                  <div className=" w-full flex flex-col justify-end items-end gap-2.5 text-right lg:items-end lg:text-right pt-0 sm:pt-5 lg:pt-10">
                    <p className="text-secondary font-gentleman text-5xl lg:text-6xl leading-[0.7] font-normal tracking-[0.04em] normal-case">{s.label}</p>
                    <p className="text-fourth/75 text-sm lg:text-base hidden sm:block">
                      {s.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
