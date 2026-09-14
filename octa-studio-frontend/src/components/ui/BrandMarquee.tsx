import { Marquee } from '@/components/ui/Marquee';

const BRAND = 'Building - Studio';

const REPEATS = 6;

const Row = ({ direction, duration }: { direction: 'left' | 'right'; duration: number }) => {
  return (
    <Marquee duration={duration} direction={direction} gap={40} pauseOnHover={false}>
      {Array.from({ length: REPEATS }, (_, i) => (
        <p
          key={i}
          className="text-secondary font-gentleman text-7xl lg:text-[8rem] font-normal normal-case "
        >
          {BRAND}
        </p>
      ))}
    </Marquee>
  );
}

export const BrandMarquee = () => {
  return (
    <div className="bg-thrird w-full overflow-hidden py-20 lg:py-25">
      <Row direction="left" duration={24.1} />
      <Row direction="right" duration={29.9} />
    </div>
  );
}
