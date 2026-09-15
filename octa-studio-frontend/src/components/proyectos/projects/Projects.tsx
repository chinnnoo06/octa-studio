import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { LinkButtonLeft } from '@/components/ui/buttons/LinkButtonLeft';
import { PROJECTS } from '@/utils/data/projects';
import { ProjectRow } from './ProjectRow';

/**
 * Proyectos por página. El original usa 5; aquí va a 3 para que la paginación
 * sea real con el catálogo actual de 4. Súbelo a 5 cuando entren más.
 */
const PAGE_SIZE = 3;

export const Projects = ({ page = 1 }: { page?: number }) => {
  const totalPages = Math.max(1, Math.ceil(PROJECTS.length / PAGE_SIZE));
  const current = Math.min(Math.max(Math.trunc(page) || 1, 1), totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const visible = PROJECTS.slice(start, start + PAGE_SIZE);

  return (
    <section data-section="projects" className="bg-thrird py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:gap-20 lg:px-15">

        <div className="text-secondary mx-auto flex w-full flex-col items-center gap-5 text-center lg:items-start lg:text-left">
          <Eyebrow>Portafolio</Eyebrow>
          <SectionTitle as="h1" size="hero" lead="Nuestros" rotating="proyectos" />

          <p className="text-fourth/75 max-w-4xl text-base lg:text-lg">
            Más de 20 años montando stands para marcas nacionales e internacionales.
            Cada proyecto nace desde cero, adaptado al espacio, los productos y el
            presupuesto de cada cliente.
          </p>
        </div>

        <div className="flex flex-col gap-5 lg:gap-7.5">
          {visible.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.1}>
              <ProjectRow project={project} priority={current === 1 && i === 0} />
            </Reveal>
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="Paginación de proyectos"
            className="flex flex-wrap items-center justify-center gap-5"
          >
            {current > 1 && (
              <LinkButtonLeft href={`/proyectos?page=${current - 1}`}>
                Página anterior
              </LinkButtonLeft>
            )}

            {current < totalPages && (
              <LinkButton href={`/proyectos?page=${current + 1}`}>
                Página siguiente
              </LinkButton>
            )}
          </nav>
        )}
      </div>
    </section>
  );
};
