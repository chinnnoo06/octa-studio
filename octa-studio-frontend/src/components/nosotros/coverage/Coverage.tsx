import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { fadeUpScale } from '@/utils/motion/reveal';
import { COVERAGE } from '@/utils/data/nosotros';
import Img from '@/assets/media/about/ImgAward.webp';

export const Coverage = () => {
  return (
    <section data-section="coverage" className="bg-primary py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:gap-20 lg:px-15">

        <div className="text-secondary mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">
          <Eyebrow>Dónde montamos</Eyebrow>
          <SectionTitle align="center" lead="Cobertura nacional e" rotating="internacional" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[3fr_7fr]">
          <Reveal variants={fadeUpScale} className="overflow-hidden rounded-xl">
            <Image
              src={Img}
              alt="Montaje de Octa Studio en un recinto ferial"
              quality={90}
              sizes="(min-width: 1820px) 470px, (min-width: 1024px) 30vw, calc(100vw - 40px)"
              className="h-75 w-full object-cover lg:h-186.5"
            />
          </Reveal>

          <div className="flex flex-col gap-5 lg:gap-7.5">
            {COVERAGE.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.1}
                className="hover:bg-secondary/15 flex flex-col gap-2.5 rounded-xl p-5 transition-colors duration-300 lg:py-7.5 lg:pr-5 lg:pl-10"
              >
                <h3 className="text-secondary text-xl font-semibold uppercase lg:text-2xl">
                  {item.title}
                </h3>

                <p className="text-fourth/75 text-sm lg:text-base">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
