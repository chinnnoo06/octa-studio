import Image from 'next/image';
import Img1 from '@/assets/media/stands/ImgStandCircle1.webp';
import Img2 from '@/assets/media/stands/ImgStandCircle2.webp';
import Img3 from '@/assets/media/stands/ImgStandCircle3.webp';
import Img4 from '@/assets/media/stands/ImgStandCircle4.webp';

const STANDS = [
  { src: Img1, alt: 'Stand con arco curvo y rótulo corporativo' },
  { src: Img2, alt: 'Stand con mostrador y perfiles retroiluminados' },
  { src: Img3, alt: 'Stand con logotipo de gran formato y área de descanso' },
  { src: Img4, alt: 'Stand corporativo en rojo con zona de demostración' },
];

export const StandStack = () => (
  <ul role="list" className="flex w-20 shrink-0 flex-col items-center">
    {STANDS.map(({ src, alt }, i) => (
      <li key={alt} className={i === 0 ? '' : '-mt-4'}>
        <Image
          src={src}
          alt={alt}
          sizes="72px"
          quality={90}
          className="ring-primary size-18 rounded-full object-cover ring-4"
        />
      </li>
    ))}
  </ul>
);
