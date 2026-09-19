import { Marquee } from '@/components/ui/Marquee';
import type { TSectionSpacing } from '@/types/content.types';

const BRAND = 'Octa Building Studio';

const REPEATS = 6;

const SPACING: Record<TSectionSpacing, string> = {
  both: 'py-20 lg:py-30',
  top: 'pt-20 lg:pt-30',
  bottom: 'pb-20 lg:pb-30',
  none: '',
};

const Row = ({ direction, duration }: { direction: 'left' | 'right'; duration: number }) => {
  return (
    <Marquee duration={duration} direction={direction} gap={40} pauseOnHover={false}>
      {Array.from({ length: REPEATS }, (_, i) => (
        <p
          key={i}
          className="text-secondary font-gentleman text-7xl lg:text-[8rem] font-normal tracking-[0.04em] normal-case"
        >
          {BRAND}
        </p>
      ))}
    </Marquee>
  );
}

export const BrandMarquee = ({ spacing = 'both' }: { spacing?: TSectionSpacing }) => {
  return (
    <div className={`bg-primary w-full overflow-hidden ${SPACING[spacing]}`}>
      <Row direction="left" duration={24.1} />
      <Row direction="right" duration={29.9} />
    </div>
  );
}
