import Image from 'next/image';
import { HeroSlider } from './HeroSlider';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { TickLine } from '@/components/ui/TickLine';
import { RevealOnLoad } from '@/components/ui/Reveal';
import { fadeBlur } from '@/utils/motion/reveal';
import Img from "@/assets/media/stands/ImgStand1.webp"

export const Hero = () => {
  return (
    <section data-section="hero" className="relative w-full overflow-x-clip">
      <Image
        src={Img}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="object-cover object-left lg:object-center"
      />

      <div aria-hidden="true" className="bg-fourth/25 absolute inset-0" />

      <div className="relative z-10 w-full">
        <div className="h-20" aria-hidden="true" />

        <div className="mt-20 flex flex-col justify-between gap-20 md:min-h-135 lg:min-h-200">

          {/* ── Bloque superior ───────────────────────────────────────────── */}
          <div className="mx-auto flex w-full max-w-[1700px] flex-col items-center gap-10 lg:gap-20 px-5 lg:px-15 md:flex-row">

            <RevealOnLoad variants={fadeBlur}>
              <h1 className="text-primary/75 font-bold uppercase
               text-center md:text-end
               text-[2.5rem] small:text-[2.75rem] md:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] 2xl:text-[5rem]
               leading-[1.2] tracking-[-0.02em]">
              Diseñamos grandes {''}<br className="hidden md:block" />
                <span className="text-primary">experiencias</span>
              </h1>
            </RevealOnLoad>

            <div className="flex w-full flex-col items-center gap-5 md:justify-end md:flex-1 md:flex-row lg:flex-none lg:w-auto ">
              <RevealOnLoad
                variants={fadeBlur}
                delay={0.15}
                className="hidden items-center gap-5 md:flex"
              >
                <TickLine className="hidden lg:flex text-primary min-h-55" />

                <ul role="list" className="flex flex-col gap-5">
                  {['Stands y ferias', 'Eventos masivos', 'Congresos', 'Activaciones'].map((item, i) => (
                    <li key={item} className="flex items-baseline gap-2.5">
                      <span className="text-primary text-base lg:text-lg">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-primary font-gentleman text-4xl lg:text-5xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </RevealOnLoad>

              <div className="flex flex-col items-center gap-10 md:hidden ">

                <p className="flex items-center gap-2.5">
                  <span className="text-primary text-5xl font-medium">
                    20
                  </span>
                  <span className="text-primary font-gentleman text-center text-5xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
                    años de montajes
                    <br />
                    nacional e internacional
                  </span>
                </p>
                <PrimaryButton href="/contacto">Agenda tu proyecto</PrimaryButton>
              </div>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[2000px] items-end justify-between gap-10">

            <div className="hidden max-w-150 items-center gap-5 md:flex md:ml-[max(0px,calc((100%-1700px)/2))] px-5 lg:px-15">
              <TickLine className="hidden lg:flex text-primary mb-10" />
              <div className="flex flex-col justify-between gap-10 mb-10 lg:min-h-60">
                <p className="flex items-center gap-5">
                  <span className="text-primary text-6xl lg:text-7xl font-medium">
                    20
                  </span>
                  <span className="text-primary font-gentleman text-5xl lg:text-6xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
                    años de montajes
                    <br />
                    nacional e internacional
                  </span>
                </p>

                <PrimaryButton href="/contacto">Agenda tu proyecto</PrimaryButton>
              </div>
            </div>

            <div className="bg-primary border-y-2.5 lg:border-y-5 border-x-5 lg:border-x-10 border-primary ml-auto w-full overflow-hidden rounded-t-xl md:max-w-150 lg:max-w-200">
              <HeroSlider />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
