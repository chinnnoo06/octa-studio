import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { PROJECTS } from '@/utils/data/projects';
import { Pagination } from '@/components/ui/Pagination';
import { paginate } from '@/utils/paginate';
import { ProjectCard } from '@/components/projects/ProjectCard';

const PAGE_SIZE = 4;

export const Projects = ({ page = 1 }: { page?: number }) => {
  const { visible, pagination } = paginate(PROJECTS, page, PAGE_SIZE);
  const current = pagination.page;
  const [left, right] = [visible.slice(0, 2), visible.slice(2)];

  return (
    <section id="portafolio" data-section="projects" className="bg-primary scroll-mt-18 py-15 lg:py-20">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        <div className="text-secondary flex flex-col gap-2.5">
          <Eyebrow>Portafolio</Eyebrow>
          <SectionTitle lead="Selección de" rotating="montajes" />
        </div>

        <div className="flex flex-col md:grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            {left.map((project, i) => (
              <Reveal key={project.name}>
                <ProjectCard project={project} priority={current === 1 && i === 0} />
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col gap-10">
            <Reveal className="hidden md:flex max-w-2xl flex-col justify-center gap-5">
              <p className="text-fourth/75 text-lg">
                ¿Buscas algo parecido para tu marca? Cuéntanos fecha, recinto y metros, y te
                devolvemos propuesta y presupuesto.
              </p>
              <LinkButton href="/contacto">Pedir cotización</LinkButton>
            </Reveal>

            <div className="flex flex-col gap-5">
              {right.map((project) => (
                <Reveal key={project.name}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="flex md:hidden max-w-2xl flex-col justify-center gap-5">
          <p className="text-fourth/75 text-base">
            ¿Buscas algo parecido para tu marca? Cuéntanos fecha, recinto y metros, y te
            devolvemos propuesta y presupuesto.
          </p>
          <LinkButton href="/contacto">Pedir cotización</LinkButton>
        </Reveal>
        <Pagination pagination={pagination} basePath="/proyectos" anchor="portafolio" />
      </div>
    </section>
  );
};
