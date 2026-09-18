import { FaBuilding, FaImages, FaTag } from 'react-icons/fa6';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnLoad } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { fadeBlur } from '@/utils/motion/reveal';
import type { TProject } from '@/schemas/projects/projects.schemas';

export const ProjectHero = ({ project }: { project: TProject }) => {
  const photos = project.images.length;

  const facts = [
    { icon: FaBuilding, label: 'Cliente', value: project.name },
    { icon: FaTag, label: 'Sector', value: project.sector },
    { icon: FaImages, label: 'Galería', value: `${photos} ${photos === 1 ? 'foto' : 'fotos'}` },
  ];

  return (
    <section data-section="project-hero" className="bg-primary pt-15 lg:pt-20">
      <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-10 px-5 lg:px-15">
        <RevealOnLoad
          variants={fadeBlur}
          className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="text-secondary flex max-w-3xl flex-col items-start gap-5">
            <Eyebrow>{project.sector}</Eyebrow>

            <h1 className="text-[2rem] small:text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-bold uppercase leading-[1.2] tracking-[-0.02em]">
              {project.name}
            </h1>
          </div>

          <div className="flex max-w-2xl flex-col gap-5">
            <p className="text-fourth/75 text-base lg:text-lg">{project.description}</p>
            <LinkButton href="/contacto">Cotizar algo parecido</LinkButton>
          </div>
        </RevealOnLoad>

        <RevealOnLoad variants={fadeBlur} className="grid gap-5 sm:grid-cols-3">
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-secondary/15 flex items-center gap-5 rounded-xl p-5 lg:p-10">
              <span className="bg-primary text-secondary flex size-10 shrink-0 items-center justify-center rounded-xl lg:size-12">
                <Icon aria-hidden="true" className="size-4 lg:size-4.5" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-secondary text-xs font-semibold uppercase lg:text-sm">{label}</span>
                <span className="text-fourth/75 text-sm lg:text-base">{value}</span>
              </div>
            </div>
          ))}
        </RevealOnLoad>
      </div>
    </section>
  );
};
