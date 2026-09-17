import { pageMetadata } from '@/utils/metadata';
import { Hero } from '@/components/services/Hero';
import { ServiceDetails } from '@/components/services/detail/ServiceDetails';
import { Pillars } from '@/components/services/pillars/Pillars';
import { CtaSection } from '@/components/sections/CtaSection';
import { BrandMarquee } from '@/components/sections/BrandMarquee';

export const metadata = pageMetadata({
  title: 'Servicios',
  description:
    'Diseño, fabricación, montaje y desmontaje de stands, eventos masivos y congresos con equipo propio.',
  path: '/servicios',
});

export default function ServiciosPage() {
  return (
    <>
      <Hero />
      <ServiceDetails />
      <CtaSection line="Elige el servicio. Del resto nos encargamos." />
      <BrandMarquee />
      <Pillars />
    </>
  );
}
