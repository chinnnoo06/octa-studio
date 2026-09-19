import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { WipeHeading } from "@/components/ui/WipeHeading";
import { Reveal } from '@/components/ui/Reveal';
import { fadeUpScale } from '@/utils/motion/reveal';
import { PURPOSE, PURPOSE_CLOSING } from '@/utils/data/about';
import { PurposeBlock } from './PurposeBlock';
import ImgPoster from '@/assets/media/renders/ImgRender5.webp';
import ImgStand from '@/assets/media/stands/ImgStand6.webp';

export const Purpose = () => {
  const [mision, vision] = PURPOSE;

  return (
    <section data-section="purpose" className="bg-thrird py-20 lg:py-30">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Misión y visión</Eyebrow>
          <WipeHeading text="Lo que nos mueve y hacia dónde vamos" />
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <Reveal className="lg:h-110">
            <PurposeBlock purpose={mision} variant="tint" />
          </Reveal>

          <Reveal variants={fadeUpScale} className="overflow-hidden rounded-xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={ImgPoster.src}
              aria-label="Recorrido por un stand terminado"
              className="aspect-4/3 w-full object-cover lg:aspect-auto lg:h-110"
            >
              <source src="/media/videos/Video3.mp4" type="video/mp4" />
            </video>
          </Reveal>

          <Reveal className="xl:col-start-2 xl:row-start-2 lg:h-110">
            <PurposeBlock purpose={vision} variant="dark" />
          </Reveal>

          <Reveal
            variants={fadeUpScale}
            className="relative overflow-hidden rounded-xl xl:col-start-1 xl:row-start-2"
          >
            <Image
              src={ImgStand}
              alt=""
              quality={90}
              sizes="(min-width: 1820px) 770px, (min-width: 1024px) calc(50vw - 80px), calc(100vw - 40px)"
              className="aspect-4/3 w-full object-cover lg:aspect-auto lg:h-110"
            />

            <div aria-hidden="true" className="bg-fourth/50 absolute inset-0" />

            <p className="text-primary absolute inset-0 flex flex-col justify-end gap-1 p-5 text-xl lg:text-2xl font-semibold uppercase lg:p-10">
              {PURPOSE_CLOSING.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
