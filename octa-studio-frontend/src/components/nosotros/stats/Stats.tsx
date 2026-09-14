import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { fadeUpScale } from '@/utils/motion/reveal';
import { STATS } from '@/utils/data/about';
import { StatCard } from './StatCard';
import ImgStats from '@/assets/media/about/ImgStats.webp';
import ImgPoster from '@/assets/media/about/ImgStatsPoster.jpg';

const TILE = 'h-75 w-full rounded-xl object-cover lg:h-100';

export const Stats = () => {
  const [first, second, third, fourth] = STATS;

  return (
    <section data-section="stats" className="bg-primary py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:gap-20 lg:px-15">

        <div className="text-secondary mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">
          <Eyebrow>Nuestras cifras</Eyebrow>
          <SectionTitle align="center" lead="Montajes que" rotating="hablan" />
        </div>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-7.5">

          <div className="flex flex-col gap-5 lg:gap-7.5">
            <Reveal variants={fadeUpScale} className="overflow-hidden rounded-xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={ImgPoster.src}
                aria-label="Montaje de un stand en vídeo"
                className={TILE}
              >
                <source src="/video/stats.mp4" type="video/mp4" />
              </video>
            </Reveal>

            <Reveal variants={fadeUpScale} delay={0.1} className="relative overflow-hidden rounded-xl">
              <Image
                src={ImgStats}
                alt="Stand de Octa Studio terminado"
                quality={90}
                sizes="(min-width: 1820px) 786px, (min-width: 1024px) calc((100vw - 160px) / 2), calc(100vw - 40px)"
                className={TILE}
              />

              <StatCard stat={first} variant="overlay" />
            </Reveal>
          </div>

          {/* Carrusel por debajo de `sm`, rejilla desde ahí. */}
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-5 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:gap-7.5">
            <Reveal
              delay={0.15}
              className="h-75 w-75 shrink-0 snap-start sm:flex sm:h-full sm:w-auto sm:shrink sm:items-center"
            >
              <div className="h-75 w-full lg:h-100">
                <StatCard stat={second} variant="dark" />
              </div>
            </Reveal>

            <div className="contents sm:flex sm:flex-col sm:gap-5 lg:gap-7.5">
              <Reveal delay={0.2} className="h-75 w-75 shrink-0 snap-start sm:w-auto sm:shrink lg:h-100">
                <StatCard stat={third} variant="tint" />
              </Reveal>

              <Reveal delay={0.25} className="h-75 w-75 shrink-0 snap-start sm:w-auto sm:shrink lg:h-100">
                <StatCard stat={fourth} variant="white" />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
