import Image from 'next/image';
import { ABOUT_HERO_STANDS } from '@/utils/data/about';

export const StandStack = () => (
  <ul role="list" className="flex w-20 shrink-0 flex-col items-center">
    {ABOUT_HERO_STANDS.map(({ src, alt }, i) => (
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
