import { Odometer } from '@/components/ui/Odometer';
import { cn } from '@/utils/cn';
import type { TStat } from '@/types/content.types';

type TStatCardProps = {
  stat: TStat;
  /** `overlay` va encima de una foto; el resto son tarjetas sólidas. */
  variant: 'dark' | 'tint' | 'white' | 'overlay';
};

const VARIANT: Record<TStatCardProps['variant'], string> = {
  dark: 'bg-fourth',
  tint: 'bg-secondary/15',
  white: 'bg-primary border border-fourth/30',
  overlay: 'bg-fourth/50 absolute inset-0',
};

export const StatCard = ({ stat, variant }: TStatCardProps) => {
  const light = variant === 'dark' || variant === 'overlay';

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col justify-between gap-5 rounded-xl p-5 lg:p-10',
        VARIANT[variant],
      )}
    >
      <Odometer values={stat.odometer} suffix={stat.suffix} tone={light ? 'light' : 'dark'} />

      <div className="flex flex-col gap-2.5">
        <h3
          className={cn(
            'text-lg font-semibold uppercase lg:text-xl',
            light ? 'text-primary' : 'text-secondary',
          )}
        >
          {stat.label}
        </h3>

        <p className={cn('text-sm lg:text-base', light ? 'text-primary/75' : 'text-fourth/75')}>
          {stat.description}
        </p>
      </div>
    </div>
  );
};
