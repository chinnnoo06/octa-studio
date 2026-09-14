import type { Metadata } from 'next';
import { Hero } from '@/components/nosotros/hero/Hero';
import { Stats } from '@/components/nosotros/stats/Stats';
import { Story } from '@/components/nosotros/story/Story';
import { Team } from '@/components/nosotros/team/Team';
import { Coverage } from '@/components/nosotros/coverage/Coverage';
import { Faq } from '@/components/ui/faq/Faq';

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Veinte años diseñando, fabricando y montando stands con equipo propio en todo México y parte de Estados Unidos.',
};

export default function NosotrosPage() {
  return (
    <main className="pt-18">
      <Hero />
      <Stats />
      <Story />
      <Team />
      <Coverage />
      <Faq />
    </main>
  );
}
