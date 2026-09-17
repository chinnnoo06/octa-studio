import type { TTestimonial } from '@/types/content.types';

/**
 * PROVISIONALES. Sustituyen a los de la plantilla (en ingles y sobre casas)
 * hasta que el cliente pase testimonios reales. No son de personas reales: el
 * `name` es un cargo y un sector, no un nombre. Cambiar en cuanto haya reales.
 */
export const TESTIMONIALS: TTestimonial[] = [
  {
    quote:
      '“Nos entregaron el render en la primera semana y el stand quedó exactamente igual. El día del montaje no tuvimos que llamar a nadie.”',
    name: 'Gerente de marketing · sector agro',
    rating: 5,
  },
  {
    quote:
      '“Un solo equipo para diseño, fabricación y montaje. Se nota cuando no hay que coordinar a tres proveedores distintos.”',
    name: 'Dirección comercial · sector ferretero',
    rating: 5,
  },
  {
    quote:
      '“Montaron en Monterrey con su propia cuadrilla y desmontaron dentro del plazo del recinto. Cero sorpresas.”',
    name: 'Coordinación de eventos · sector industrial',
    rating: 5,
  },
  {
    quote:
      '“Llegamos sin idea clara de qué stand necesitábamos y salieron con una propuesta ajustada al presupuesto y al espacio.”',
    name: 'Dirección general · empresa expositora',
    rating: 5,
  },
];
