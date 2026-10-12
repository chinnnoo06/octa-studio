import type { Metadata } from 'next';
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { Hero } from '@/components/services/Hero';
import { ServiceDetails } from '@/components/services/detail/ServiceDetails';
import { Pillars } from '@/components/services/pillars/Pillars';
import { CtaSection } from '@/components/sections/CtaSection';
import { BrandMarquee } from '@/components/sections/BrandMarquee';

export const metadata: Metadata = {
  title: 'Servicios de stands, eventos y congresos',
  description: 'Diseño, fabricación, montaje y desmontaje de stands, escenarios para eventos masivos y congresos, con logística y equipo propio en México y Estados Unidos.',
  alternates: { canonical: '/servicios' },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    url: '/servicios',
    title: 'Servicios de stands, eventos y congresos | Octa Building Studio',
    description: 'Diseño, fabricación, montaje y desmontaje de stands, escenarios para eventos masivos y congresos, con logística y equipo propio en México y Estados Unidos.',
  },
  twitter: {
    ...SHARED_TWITTER,
    title: 'Servicios de stands, eventos y congresos | Octa Building Studio',
    description: 'Diseño, fabricación, montaje y desmontaje de stands, escenarios para eventos masivos y congresos, con logística y equipo propio en México y Estados Unidos.',
  },
};

export default function ServiciosPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[{ name: 'Servicios', path: '/servicios' }]} />
      <Hero />
      <ServiceDetails />
      <CtaSection line="Elige el servicio. Del resto nos encargamos." />
      <BrandMarquee spacing="top" />
      <Pillars />
    </>
  );
}
