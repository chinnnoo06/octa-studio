import type { Metadata } from 'next';
import { Contact } from '@/components/contacto/contact/Contact';
import { Faq } from '@/components/ui/faq/Faq';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Cotiza tu stand, evento o congreso con Octa Studio. Guadalajara, Monterrey, Ciudad de México y todo el país.',
};

export default function ContactoPage() {
  return (
    <>
      <Contact />
      <Faq />
    </>
  );
}
