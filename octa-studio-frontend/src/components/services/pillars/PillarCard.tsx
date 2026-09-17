import type { TPillar } from '@/types/content.types';

export const PillarCard = ({ pillar }: { pillar: TPillar }) => {
  return (
    <div className="bg-secondary/15 flex h-full flex-col justify-between gap-5 rounded-xl p-5 lg:p-10">
      <p className="text-secondary text-5xl font-semibold lg:text-6xl">{pillar.number}</p>

      <h3 className="text-secondary font-gentleman text-5xl leading-[0.7] font-normal tracking-[0.04em] normal-case lg:text-6xl">
        {pillar.title}
      </h3>
    </div>
  );
};
