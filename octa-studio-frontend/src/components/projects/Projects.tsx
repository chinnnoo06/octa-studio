import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { Pagination } from '@/components/ui/Pagination';
import { ProjectCard } from '@/components/projects/ProjectCard';
import type { TProject } from '@/schemas/projects/projects.schemas';
import type { TPagination } from '@/schemas/common/common.response.schemas';

type TProjectsProps = {
  projects: TProject[];
  pagination: TPagination;
};

export const Projects = ({ projects, pagination }: TProjectsProps) => {
  return (
    <section id="portafolio" data-section="projects" className="bg-primary scroll-mt-18 py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15">

        {/* Misma cabecera que en la home: titulo a la izquierda, texto de
            apoyo y boton a la derecha; las tarjetas apaisadas debajo. */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="text-secondary flex flex-col gap-2.5">
            <Eyebrow>Portafolio</Eyebrow>
            <SectionTitle lead="Selección de" rotating="montajes" />
          </div>

          <Reveal className="flex max-w-2xl flex-col gap-5">
            <p className="text-fourth/75 text-base lg:text-lg">
              ¿Buscas algo parecido para tu marca? Cuéntanos fecha, recinto y metros, y te
              devolvemos propuesta y presupuesto.
            </p>
            <LinkButton href="/contacto">Pedir cotización</LinkButton>
          </Reveal>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <Reveal key={project._id}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="border-fourth/30 text-fourth/75 rounded-xl border p-5 text-sm lg:p-10 lg:text-base">
            Todavía no hay proyectos publicados.
          </p>
        )}

        <Pagination pagination={pagination} basePath="/proyectos" anchor="portafolio" />
      </div>
    </section>
  );
};
