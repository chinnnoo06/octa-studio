import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Marquee } from '@/components/ui/Marquee';
import type { TTestiomonial } from '@/schemas/testimonials/testimonials.schemas';
import type { TSectionSpacing } from '@/types/content.types';

const MIN_TILES = 10;

const SPACING: Record<TSectionSpacing, string> = {
  both: 'py-15 lg:py-20',
  top: 'pt-15 lg:pt-20',
  bottom: 'pb-15 lg:pb-20',
  none: '',
};

const EDGE_FADE = 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)';

const Row = ({ logos, direction, duration }: { logos: TTestiomonial[]; direction: 'left' | 'right'; duration: number }) => {
  const repeats = Math.max(1, Math.ceil(MIN_TILES / logos.length));

  return (
    <Marquee duration={duration} direction={direction} gap={20} className="py-1">
      {Array.from({ length: repeats }, (_, r) =>
        logos.map((t) => (
          <div
            key={`${t._id}-${r}`}
            className="group flex h-25 w-45 shrink-0 items-center justify-center rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 lg:h-30 lg:w-55"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_TESTIMONIALS_IMAGE_URL}/${t.image}`}
              alt={`Empresa de ${t.name}`}
              width={220}
              height={120}
              sizes="(min-width: 1024px) 220px, 180px"
              className="size-full object-contain opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
          </div>
        )),
      )}
    </Marquee>
  );
};

type TClientsMarqueeProps = {
  testimonials: TTestiomonial[];
  spacing?: TSectionSpacing;
};

export const ClientsMarquee = ({ testimonials, spacing = 'both' }: TClientsMarqueeProps) => {
  const logos = testimonials.filter((t, i, all) => all.findIndex((o) => o.image === t.image) === i);

  if (logos.length === 0) return null;

  const half = Math.ceil(logos.length / 2);
  const shifted = [...logos.slice(half), ...logos.slice(0, half)];

  return (
    <section data-section="clients" className={`bg-primary flex flex-col gap-10 ${SPACING[spacing]}`}>
      <div className="text-secondary mx-auto flex w-full max-w-[1700px] flex-col items-center gap-2.5 px-5 text-center lg:px-15">
        <Eyebrow>Confían en nosotros</Eyebrow>
        <SectionTitle align="center" lead="Marcas que ya exponen con" rotating="Octa" />
      </div>

      <div className="flex flex-col gap-5" style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}>
        <Row logos={logos} direction="left" duration={38} />
        <Row logos={shifted} direction="right" duration={46} />
      </div>
    </section>
  );
};
