import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { fadeUpScale } from '@/utils/motion/reveal';
import { STATS } from '@/utils/data/about';
import ImgPoster from '@/assets/media/renders/ImgRender4.webp';
import ImgStand from "@/assets/media/stands/ImgStand8.webp"
import { StatCard } from './StatCard';

export const Stats = () => {
  const [first, second, third, fourth] = STATS;

  return (
    <section data-section="stats" className="bg-primary py-15 lg:py-20">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="text-secondary mx-auto flex max-w-4xl flex-col items-center gap-2.5 text-center">
          <Eyebrow>Nuestras cifras</Eyebrow>
          <SectionTitle align="center" lead="Montajes que" rotating="hablan" />
        </div>

        <div className="grid gap-10 xl:grid-cols-2 ">

          <div className="flex flex-col md:flex-row xl:flex-col gap-5">
            <Reveal variants={fadeUpScale} className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl xl:mx-0 xl:max-w-none">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={ImgPoster.src}
                aria-label="Montaje de un stand en vídeo"
                className="aspect-4/3 w-full rounded-xl object-cover xl:aspect-auto xl:h-110"
              >
                <source src="/media/videos/Video2.mp4" type="video/mp4" />
              </video>
            </Reveal>

            <Reveal variants={fadeUpScale} className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-xl xl:mx-0 xl:max-w-none">
              <Image
                src={ImgStand}
                alt="Stand de Octa Building Studio terminado"
                quality={90}
                sizes="(min-width: 1820px) 770px, (min-width: 1280px) calc(50vw - 80px), (min-width: 712px) 672px, calc(100vw - 40px)"
                className="aspect-4/3 w-full rounded-xl object-cover xl:aspect-auto xl:h-110"
              />

              <StatCard stat={first} variant="overlay" />
            </Reveal>
          </div>

          {/* Carrusel por debajo de `sm`, rejilla desde ahí. */}
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-5 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0">
            <Reveal
              className="h-75 w-75 shrink-0 snap-start sm:flex sm:h-full sm:w-auto sm:shrink sm:items-center"
            >
              <div className="h-75 w-full lg:h-100">
                <StatCard stat={second} variant="dark" />
              </div>
            </Reveal>

            <div className="contents sm:flex sm:flex-col sm:gap-5 lg:gap-5">
              <Reveal className="h-75 w-75 shrink-0 snap-start sm:w-auto sm:shrink lg:h-100">
                <StatCard stat={third} variant="tint" />
              </Reveal>

              <Reveal className="h-75 w-75 shrink-0 snap-start sm:w-auto sm:shrink lg:h-100">
                <StatCard stat={fourth} variant="white" />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
