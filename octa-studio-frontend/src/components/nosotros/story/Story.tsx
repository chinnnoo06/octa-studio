import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { fadeUpScale } from '@/utils/motion/reveal';
import { PILLARS } from '@/utils/data/nosotros';
import { StoryCard } from './StoryCard';
import ImgLeft from '@/assets/media/about/ImgStoryLeft.webp';
import ImgPoster from '@/assets/media/about/ImgStoryPoster.jpg';

const TILE = 'h-80 w-full rounded-xl object-cover sm:h-100 lg:h-136';

export const Story = () => {
  return (
    <section data-section="story" className="bg-thrird py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:gap-20 lg:px-15">

        <div className="text-secondary flex flex-col gap-5">
          <Eyebrow>Nuestra historia</Eyebrow>
          <SectionTitle lead="De la primera idea al" rotating="montaje" />
        </div>

        <div className="flex flex-col gap-5 lg:gap-7.5">
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-7.5">
            {/* La foto de apoyo desaparece en móvil, igual que en la referencia. */}
            <Reveal variants={fadeUpScale} className="hidden overflow-hidden rounded-xl sm:block">
              <Image
                src={ImgLeft}
                alt="Taller de Octa Studio durante la fabricación de un stand"
                quality={90}
                sizes="(min-width: 1820px) 786px, (min-width: 640px) calc((100vw - 60px) / 2), calc(100vw - 40px)"
                className={TILE}
              />
            </Reveal>

            <Reveal variants={fadeUpScale} delay={0.1} className="overflow-hidden rounded-xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={ImgPoster.src}
                aria-label="Recorrido por un stand terminado"
                className={TILE}
              >
                <source src="/video/story.mp4" type="video/mp4" />
              </video>
            </Reveal>
          </div>

          {/* Carrusel por debajo de `sm`, rejilla desde ahí. */}
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-5 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4 lg:gap-7.5">
            {PILLARS.map((pillar, i) => (
              <Reveal
                key={pillar.number}
                delay={i * 0.1}
                className="h-33.5 w-50 shrink-0 snap-start sm:h-auto sm:w-auto sm:shrink lg:h-50"
              >
                <StoryCard pillar={pillar} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
