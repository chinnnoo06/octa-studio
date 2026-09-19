import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { ProjectCard } from '@/components/projects/ProjectCard';
import type { TProject } from '@/schemas/projects/projects.schemas';

export const RelatedProjects = ({ projects }: { projects: TProject[] }) => {
  if (projects.length === 0) return null;

  return (
    <section data-section="project-related" className="bg-primary py-20 lg:py-30">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="text-secondary flex flex-col gap-2.5">
            <Eyebrow>Sigue mirando</Eyebrow>
            <SectionTitle lead="Más" rotating="montajes" />
          </div>

          <LinkButton href="/proyectos#portafolio">Ver todos los proyectos</LinkButton>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Reveal key={project._id}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
