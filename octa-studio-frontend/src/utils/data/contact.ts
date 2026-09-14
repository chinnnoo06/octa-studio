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

  /** Dónde opera, según el brief: todo México y parte de Estados Unidos. */
  coverage: {
    summary: 'Todo México y parte de Estados Unidos',
    cities: ['Guadalajara', 'Monterrey', 'Ciudad de México'],
  },
} as const;
