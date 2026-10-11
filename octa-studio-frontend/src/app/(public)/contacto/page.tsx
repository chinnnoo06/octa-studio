import type { Metadata } from 'next';
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';
import { Hero } from '@/components/contact/Hero';
import { Channels } from '@/components/contact/channels/Channels';
import { Faqs } from '@/components/sections/faqs/Faqs';
import { Statement } from '@/components/sections/Statement';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Cotiza tu stand, evento o congreso por WhatsApp, teléfono o correo. Atendemos en Guadalajara, Monterrey, Ciudad de México, todo el país y Estados Unidos.',
  alternates: { canonical: '/contacto' },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    url: '/contacto',
    title: 'Contacto | Octa Building Studio',
    description: 'Cotiza tu stand, evento o congreso por WhatsApp, teléfono o correo. Atendemos en Guadalajara, Monterrey, Ciudad de México, todo el país y Estados Unidos.',
  },
  twitter: {
    ...SHARED_TWITTER,
    title: 'Contacto | Octa Building Studio',
    description: 'Cotiza tu stand, evento o congreso por WhatsApp, teléfono o correo. Atendemos en Guadalajara, Monterrey, Ciudad de México, todo el país y Estados Unidos.',
  },
};

export default function ContactoPage() {
  return (
    <>
      <Hero />
      <Channels />
      <Faqs />
      <Statement lead="En Octa, el valor agregado es" highlight="nuestro equipo." />
    </>
  );
}
