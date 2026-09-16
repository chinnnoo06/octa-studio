import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { fadeUpScale } from '@/utils/motion/reveal';
import { StoryCard } from './StoryCard';
import ImgLeft from '@/assets/media/stands/ImgStand6.webp';
import ImgPoster from '@/assets/media/renders/ImgRender5.jpg';
import { PILLARS } from '@/utils/data/about';

export const Story = () => {
  return (
    <section data-section="story" className="bg-thrird py-15 lg:py-20">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Nuestra historia</Eyebrow>
          <SectionTitle lead="De la primera idea al" rotating="montaje" />
        </div>

        <div className="flex flex-col gap-10">
          <div className="grid gap-5 sm:grid-cols-2 ">
            <Reveal variants={fadeUpScale} className="hidden overflow-hidden rounded-xl sm:block">
              <Image
                src={ImgLeft}
                alt="Equipo de Octa Studio montando un stand en el recinto"
                quality={90}
                sizes="(min-width: 1820px) 770px, (min-width: 1024px) calc(50vw - 80px), calc(100vw - 40px)"
                className="w-full rounded-xl object-cover h-100 lg:h-110"
              />
            </Reveal>

            <Reveal variants={fadeUpScale} className="overflow-hidden rounded-xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={ImgPoster.src}
                aria-label="Recorrido por un stand terminado"
                className="w-full rounded-xl object-cover h-100 lg:h-110"
              >
                <source src="/media/videos/Video3.mp4" type="video/mp4" />
              </video>
            </Reveal>
          </div>

          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-5 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4 ">
            {PILLARS.map((pillar, i) => (
              <Reveal
                key={pillar.number}
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
