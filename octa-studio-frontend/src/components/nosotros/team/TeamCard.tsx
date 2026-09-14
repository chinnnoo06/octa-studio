import Image from 'next/image';
import { cn } from '@/utils/cn';
import type { TTeamArea } from '@/types/content';

type TTeamCardProps = {
  area: TTeamArea;
  /** La tarjeta ancha de la columna izquierda. */
  wide?: boolean;
};

export const TeamCard = ({ area, wide = false }: TTeamCardProps) => {
  return (
    <div className="group relative h-full overflow-hidden rounded-xl">
      <Image
        src={area.image}
        alt={area.alt}
        quality={90}
        sizes={
          wide
            ? '(min-width: 1820px) 786px, (min-width: 1024px) calc((100vw - 160px) / 2), calc(100vw - 40px)'
            : '(min-width: 1820px) 383px, (min-width: 1024px) calc((100vw - 190px) / 4), (min-width: 640px) calc((100vw - 60px) / 2), 250px'
        }
        className="ease-brand h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />

      <span aria-hidden="true" className="bg-fourth/40 absolute inset-0" />

      <div className={cn('absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5', wide && 'lg:p-10')}>
        <h3
          className={cn(
            'text-primary font-semibold uppercase',
            wide ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl',
          )}
        >
          {area.area}
        </h3>

        <p className="text-primary/75 text-sm lg:text-base">{area.description}</p>
      </div>
    </div>
  );
};
