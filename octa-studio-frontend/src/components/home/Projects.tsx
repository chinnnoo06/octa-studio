import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Reveal } from '@/components/ui/Reveal';
import type { TProject } from '@/schemas/projects/projects.schemas';

export const Projects = ({ projects }: { projects: TProject[] }) => {
  if (projects.length === 0) return null;

  return (
    <section data-section="projects" className="py-20 lg:py-25 bg-primary">
      <div className="mx-auto max-w-[1700px] px-5 lg:px-15 flex flex-col gap-10">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="text-secondary flex flex-col items-start gap-2.5 max-w-3xl">
            <Eyebrow>Nuestros Proyectos</Eyebrow>
            <SectionTitle lead="Proyectos que hablan por" rotating="nosotros" />
          </div>

          <Reveal className="flex max-w-2xl flex-col gap-5">
            <p className="text-fourth/75 text-base lg:text-lg">
              Más de 20 años montando stands para marcas nacionales e internacionales.
              Cada proyecto nace desde cero, adaptado al espacio, los productos y el presupuesto de cada cliente.
            </p>
            <LinkButton href="/proyectos">Ver todos los proyectos</LinkButton>
          </Reveal>
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
}
