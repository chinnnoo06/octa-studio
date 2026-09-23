import Image, { type StaticImageData } from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { fadeUpScale } from '@/utils/motion/reveal';

type TStatementProps = {
  lead: string;
  highlight: string;
  images?: { src: StaticImageData; alt: string }[];
};

export const Statement = ({ lead, highlight, images }: TStatementProps) => {
  return (
    <section data-section="statement" className="bg-primary flex min-h-[60svh] items-center py-15 lg:py-20">
      <div className="mx-auto flex max-w-[1700px] flex-col items-center gap-10 px-5 text-center lg:gap-15 lg:px-15">
        <h2 className="font-gentleman max-w-6xl text-7xl lg:text-[8rem] leading-[0.7] font-normal tracking-[0.04em] normal-case">
          <span className="text-secondary/75">{lead}</span>{' '}
          <span className="text-secondary">{highlight}</span>
        </h2>

        {images && images.length > 0 && (
          <div className="grid w-full grid-cols-2 gap-5 lg:grid-cols-4">
            {images.map((image) => (
              <Reveal key={image.alt} variants={fadeUpScale} className="overflow-hidden rounded-xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  sizes="(min-width: 1820px) 400px, (min-width: 1024px) 25vw, 50vw"
                  className="aspect-4/3 w-full object-cover"
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
