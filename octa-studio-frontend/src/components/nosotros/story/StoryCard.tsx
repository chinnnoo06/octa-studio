import type { TPillar } from '@/types/content.types';

export const StoryCard = ({ pillar }: { pillar: TPillar }) => {
  return (
    <div className="bg-secondary/15 flex h-full flex-col justify-between gap-5 rounded-xl p-5 lg:p-7.5">
      <p className="text-secondary font-semibold text-5xl lg:text-6xl">{pillar.number}</p>

      <h3 className="text-secondary font-gentleman text-5xl lg:text-6xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
        {pillar.title}
      </h3>
    </div>
  );
};
