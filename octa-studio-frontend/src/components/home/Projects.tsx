import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PROJECTS } from '@/utils/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Reveal } from '@/components/ui/Reveal';

export const Projects = () => {
  const [left, right] = [PROJECTS.slice(0, 2), PROJECTS.slice(2)];

  return (
    <section data-section="projects" className="py-15 lg:py-20 bg-primary">
      <div className="mx-auto max-w-[1700px] px-5 lg:px-15 flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col gap-10 overflow-hidden">

          <div className="text-secondary flex flex-col items-start gap-2.5 max-w-3xl">
            <Eyebrow>Nuestros Proyectos</Eyebrow>
            <SectionTitle lead="Proyectos que hablan por" rotating="nosotros" />
          </div>

          <div className="flex flex-col md:grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-5">
              {left.map((p, i) => (
                <Reveal key={p.name}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>

            <div className="flex flex-col gap-10">
              <Reveal className="hidden md:flex max-w-2xl flex-col justify-center gap-5">
                <p className="text-fourth/75 text-lg">
                  Más de 20 años montando stands para marcas nacionales e internacionales.
                  Cada proyecto nace desde cero, adaptado al espacio, los productos y el presupuesto de cada cliente.
                </p>
                <LinkButton href="/proyectos">Ver todos los proyectos</LinkButton>
              </Reveal>
              <div className="flex flex-col gap-5">
                {right.map((p, i) => (
                  <Reveal key={p.name}>
                    <ProjectCard project={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <Reveal className="flex md:hidden max-w-2xl flex-col justify-center gap-5">
            <p className="text-fourth/75 text-base">
              Más de 20 años montando stands para marcas nacionales e internacionales.
              Cada proyecto nace desde cero, adaptado al espacio, los productos y el presupuesto de cada cliente.
            </p>
            <LinkButton href="/proyectos">Ver todos los proyectos</LinkButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
