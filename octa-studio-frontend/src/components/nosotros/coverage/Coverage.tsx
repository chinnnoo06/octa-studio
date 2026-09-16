import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { fadeUpScale } from '@/utils/motion/reveal';
import ImgPoster from '@/assets/media/stands/ImgStand2.webp';
import { COVERAGE } from '@/utils/data/about';

export const Coverage = () => {
  return (
    <section data-section="coverage" className="bg-primary py-15 lg:py-20">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="text-secondary mx-auto flex max-w-4xl flex-col items-center gap-2.5 text-center">
          <Eyebrow>Dónde montamos</Eyebrow>
          <SectionTitle align="center" lead="Cobertura nacional e" rotating="internacional" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 w-full">
          <Reveal variants={fadeUpScale} className="overflow-hidden rounded-xl w-full lg:w-120 ">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={ImgPoster.src}
              aria-label="Montaje de Octa Studio en un recinto ferial"
              className="h-75 w-full object-cover lg:h-186.5"
            >
              <source src="/media/videos/Video1.mp4" type="video/mp4" />
            </video>
          </Reveal>

          <div className="flex flex-col gap-5 justify-center flex-1 ">
            {COVERAGE.map((item, i) => (
              <Reveal
                key={item.title}
                className="hover:bg-secondary/15 flex flex-col gap-2.5 rounded-xl p-5 transition-colors duration-300 lg:py-7.5 lg:pr-5 lg:pl-10"
              >
                <h3 className="text-secondary text-xl lg:text-2xl font-semibold uppercase">
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
