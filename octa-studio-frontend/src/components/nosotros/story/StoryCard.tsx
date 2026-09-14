import type { TPillar } from '@/types/content.types';

export const StoryCard = ({ pillar }: { pillar: TPillar }) => {
  return (
    <div className="bg-secondary/15 flex h-full flex-col justify-between gap-5 rounded-xl p-5 lg:p-7.5">
      <p className="text-secondary text-4xl font-semibold lg:text-5xl">{pillar.number}</p>

      <h3 className="text-secondary text-lg font-semibold uppercase lg:text-xl">
        {pillar.title}
      </h3>
    </div>
  );
};
