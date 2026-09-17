import { pageMetadata } from '@/utils/metadata';
import { Hero } from '@/components/contact/Hero';
import { Channels } from '@/components/contact/channels/Channels';
import { Faqs } from '@/components/sections/faqs/Faqs';
import { Statement } from '@/components/sections/Statement';

export const metadata = pageMetadata({
  title: 'Contacto',
  description:
    'Llámanos, escríbenos por WhatsApp o mándanos un correo para cotizar tu stand, evento o congreso. Guadalajara, Monterrey, Ciudad de México, todo el país y Estados Unidos.',
  path: '/contacto',
});

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
