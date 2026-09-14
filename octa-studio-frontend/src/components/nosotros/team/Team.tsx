import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { TEAM_AREAS } from '@/utils/data/nosotros';
import { TeamCard } from './TeamCard';
import Bg from '@/assets/media/about/ImgTeamBg.webp';
import ImgArrow from '@/assets/media/about/ImgRoundArrow.png';

export const Team = () => {
  const [wide, ...rest] = TEAM_AREAS;

  return (
    <section data-section="team" className="bg-fourth relative overflow-hidden py-20 lg:py-25">
      <Image src={Bg} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />

      <div aria-hidden="true" className="bg-fourth/75 absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-[1700px] px-5 lg:px-15">
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-7.5">

          <div className="flex flex-col justify-between gap-10 lg:gap-2.5">
            <div className="flex max-w-120 flex-col gap-10 lg:gap-15">
              <div className="text-primary flex flex-col gap-5">
                <Eyebrow>Nuestro equipo</Eyebrow>
                <SectionTitle tone="light" lead="La gente que lo" rotating="monta" />
              </div>

              <PrimaryButton href="/contacto">Trabaja con nosotros</PrimaryButton>
            </div>

            <Reveal className="h-62.5 sm:h-100">
              <TeamCard area={wide} wide />
            </Reveal>
          </div>

          {/* Carrusel por debajo de `sm`, rejilla desde ahí. */}
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-5 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:gap-7.5">
            {rest.map((area, i) => (
              <Reveal
                key={area.area}
                delay={i * 0.1}
                className="h-62.5 w-62.5 shrink-0 snap-start sm:h-100 sm:w-auto sm:shrink"
              >
                <TeamCard area={area} />
              </Reveal>
            ))}

            <Reveal delay={0.3} className="h-62.5 w-62.5 shrink-0 snap-start sm:h-100 sm:w-auto sm:shrink">
              <div className="bg-primary flex h-full flex-col items-center justify-center gap-2.5 rounded-xl p-2.5">
                <div className="relative flex size-40 items-center justify-center lg:size-50">
                  <Image
                    src={ImgArrow}
                    alt=""
                    sizes="200px"
                    className="spin-slow size-full object-contain"
                  />

                  <p className="absolute inset-0 m-auto flex flex-col items-center justify-center">
                    <span className="text-secondary text-3xl font-semibold lg:text-4xl">20+</span>
                    <span className="text-secondary text-sm font-semibold uppercase lg:text-base">
                      años de oficio
                    </span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
