import type { TChannel } from '@/types/content.types';

const PHONE_DISPLAY = '33 4493 4790';

const PHONE_E164 = '+523344934790';

const WHATSAPP_DISPLAY = '33 3405 0215';

const WHATSAPP_NUMBER = '523334050215';

const WHATSAPP_MESSAGE = 'Hola, me interesa cotizar un proyecto con Octa Building Studio.';

const mail = (label: string, address: string) => ({
  label,
  address,
  href: `mailto:${address}`,
});

export const CONTACT = {
  phone: {
    display: PHONE_DISPLAY,
    href: `tel:${PHONE_E164}`,
  },

  whatsapp: {
    display: WHATSAPP_DISPLAY,
    number: WHATSAPP_NUMBER,
    message: WHATSAPP_MESSAGE,
    url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    label: 'Escríbenos por WhatsApp',
  },

  /** Dos buzones: uno para cotizar y otro para dirección. */
  emails: [
    mail('Proyectos', 'proyectosocta@octabuilding-studio.com'),
    mail('Dirección', 'ceocompany@octabuilding-studio.com'),
  ],

  /** Dónde opera: todo México y todo Estados Unidos. */
  coverage: {
    summary: 'Todo México y Estados Unidos',
    cities: ['Guadalajara', 'Monterrey', 'Ciudad de México'],
  },
} as const;


export const CHANNELS: TChannel[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'La forma más rápida. Abre el chat con un mensaje ya escrito y cuéntanos tu proyecto.',
    action: 'Abrir chat',
    links: [{ label: 'Chat directo', value: CONTACT.whatsapp.display, href: CONTACT.whatsapp.url }],
  },
  {
    id: 'telefono',
    name: 'Teléfono',
    description: 'Para cotizar de viva voz o resolver dudas al momento.',
    action: 'Llamar',
    links: [{ label: 'Oficina', value: CONTACT.phone.display, href: CONTACT.phone.href }],
  },
  {
    id: 'correo',
    name: 'Correo',
    description: 'Para enviarnos planos, referencias o bases de licitación.',
    action: 'Escribir',
    links: CONTACT.emails.map((m) => ({ label: m.label, value: m.address, href: m.href })),
  },
];
