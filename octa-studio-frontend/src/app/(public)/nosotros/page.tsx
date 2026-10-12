import type { Metadata } from 'next';
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { Hero } from '@/components/aboutUs/hero/Hero';
import { Stats } from '@/components/aboutUs/stats/Stats';
import { Testimonials } from '@/components/testimonials/section/Testimonials';
import { ClientsMarquee } from '@/components/testimonials/section/ClientsMarquee';
import { Purpose } from '@/components/aboutUs/purpose/Purpose';
import { Coverage } from '@/components/aboutUs/Coverage';
import { CtaSection } from '@/components/sections/CtaSection';
import { BrandMarquee } from '@/components/sections/BrandMarquee';
import { getTestimonialsService } from '@/services/server/testimonial.service';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce a Octa Building Studio: 20 años diseñando, fabricando y montando stands con equipo propio para marcas en todo México y Estados Unidos.',
  alternates: { canonical: '/nosotros' },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    url: '/nosotros',
    title: 'Nosotros | Octa Building Studio',
    description: 'Conoce a Octa Building Studio: 20 años diseñando, fabricando y montando stands con equipo propio para marcas en todo México y Estados Unidos.',
  },
  twitter: {
    ...SHARED_TWITTER,
    title: 'Nosotros | Octa Building Studio',
    description: 'Conoce a Octa Building Studio: 20 años diseñando, fabricando y montando stands con equipo propio para marcas en todo México y Estados Unidos.',
  },
};

export default async function NosotrosPage() {
  const testimonials = await getTestimonialsService();

  return (
    <>
      <BreadcrumbStructuredData items={[{ name: 'Nosotros', path: '/nosotros' }]} />
      <Hero />
      <Purpose />
      <Testimonials testimonials={testimonials} />
      <Stats />
      <BrandMarquee spacing="bottom" />
      <CtaSection line="Ya sabes quiénes somos. Ahora cuéntanos de ti." />
      <ClientsMarquee testimonials={testimonials} spacing="top" />
      <Coverage />
    </>
  );
}
