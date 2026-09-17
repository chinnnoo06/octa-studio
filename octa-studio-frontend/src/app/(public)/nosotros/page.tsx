import { pageMetadata } from '@/utils/metadata';
import { Hero } from '@/components/aboutUs/hero/Hero';
import { Stats } from '@/components/aboutUs/stats/Stats';
import { Testimonials } from '@/components/testimonials/section/Testimonials';
import { Purpose } from '@/components/aboutUs/purpose/Purpose';
import { Coverage } from '@/components/aboutUs/Coverage';
import { Faqs } from '@/components/sections/faqs/Faqs';
import { CtaSection } from '@/components/sections/CtaSection';
import { BrandMarquee } from '@/components/sections/BrandMarquee';

export const metadata = pageMetadata({
  title: 'Nosotros',
  description:
    'Veinte años diseñando, fabricando y montando stands con equipo propio en todo México y Estados Unidos.',
  path: '/nosotros',
});

export default function NosotrosPage() {
  return (
    <>
      <Hero />
      <Purpose />
      <Testimonials />
      <Stats />
      <BrandMarquee />
      <CtaSection line="Ya sabes quiénes somos. Ahora cuéntanos de ti." />
      <Coverage />
    </>
  );
}
