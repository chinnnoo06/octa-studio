import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { PrimaryButtonLeft } from '@/components/ui/buttons/PrimaryButtonLeft';
import { SERVICES } from '@/utils/data/services';
import { ServiceBox } from './ServiceBox';

/** Servicios por página, como en la referencia. */
const PAGE_SIZE = 5;

export const Services = ({ page = 1 }: { page?: number }) => {
  const totalPages = Math.max(1, Math.ceil(SERVICES.length / PAGE_SIZE));
  const current = Math.min(Math.max(Math.trunc(page) || 1, 1), totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const visible = SERVICES.slice(start, start + PAGE_SIZE);

  return (
    <section data-section="services" className="bg-thrird py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:gap-20 lg:px-15">

        <div className="text-secondary flex w-full flex-col items-center gap-5 text-center lg:items-start lg:text-left">
          <Eyebrow>Lo que hacemos</Eyebrow>
          <SectionTitle as="h1" size="hero" lead="Nuestros" rotating="servicios" />

          <p className="text-fourth/75 max-w-4xl text-base lg:text-lg">
            Diseñamos, fabricamos, montamos y desmontamos con equipo propio. No necesitas
            coordinar a varios proveedores: el mismo equipo te acompaña desde la primera
            reunión hasta que cierra el evento.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-7.5">
          {visible.map((service, i) => (
            <Reveal key={service.href} delay={i * 0.1} className="h-full">
              <ServiceBox service={service} />
            </Reveal>
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="Paginación de servicios"
            className="flex flex-wrap items-center justify-center gap-5"
          >
            {current > 1 && (
              <PrimaryButtonLeft href={`/servicios?page=${current - 1}`}>
                Página anterior
              </PrimaryButtonLeft>
            )}

            {current < totalPages && (
              <PrimaryButton href={`/servicios?page=${current + 1}`}>
                Página siguiente
              </PrimaryButton>
            )}
          </nav>
        )}
      </div>
    </section>
  );
};
