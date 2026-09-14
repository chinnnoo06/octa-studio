import Image, { type StaticImageData } from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

type TPhotoTileProps = {
  src: StaticImageData;
  alt: string;
  title: string;
  className: string;
  delay?: number;
  children?: React.ReactNode;
  sizes?: string;
  quality?: number;
};

export const PhotoTile = ({
  src,
  alt,
  title,
  className,
  delay,
  children,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
  quality,
}: TPhotoTileProps) => {
  return (
    <Reveal
      delay={delay}
      className={`relative flex flex-col justify-end overflow-hidden rounded-xl p-5 w-75 shrink-0 snap-start sm:w-auto sm:shrink ${className}`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} quality={quality} className="object-cover" />
      <div aria-hidden="true" className="bg-fourth/50 absolute inset-0" />
      <div className="relative z-10 flex flex-col gap-5">
        {children}
        <h3 className="text-primary max-w-90 text-xl lg:text-2xl font-semibold uppercase">
          {title}
        </h3>
      </div>
    </Reveal>
  );
};
