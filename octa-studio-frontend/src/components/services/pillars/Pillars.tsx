import { Eyebrow } from '@/components/ui/Eyebrow';
import { WipeHeading } from "@/components/ui/WipeHeading";
import { Reveal } from '@/components/ui/Reveal';
import { PILLARS } from '@/utils/data/about';
import { PillarCard } from './PillarCard';

export const Pillars = () => {
  return (
    <section data-section="pillars" className="bg-primary py-15 lg:py-20">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Cómo trabajamos</Eyebrow>
          <WipeHeading text="El mismo equipo diseña, fabrica, monta y desmonta" />
        </div>

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-5 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {PILLARS.map((pillar) => (
            <Reveal
              key={pillar.number}
              className="min-h-70 w-75 shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <PillarCard pillar={pillar} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
