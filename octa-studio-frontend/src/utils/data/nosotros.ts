import type { TPillar, TTeamArea, TCoverageItem } from '@/types/content';
import { CONTACT } from '@/utils/data/contact';
import ImgMember1 from '@/assets/media/about/ImgMember1.webp';
import ImgMember2 from '@/assets/media/about/ImgMember2.webp';
import ImgMember3 from '@/assets/media/about/ImgMember3.webp';
import ImgMember4 from '@/assets/media/about/ImgMember4.webp';

/**
 * Contenido de /nosotros. La página calca la estructura de la referencia:
 * cifras, cómo trabajamos, equipo y cobertura.
 */

/** Las cuatro etapas del oficio. En la tarjeta solo se ven número y título. */
export const PILLARS: TPillar[] = [
  { number: '01', title: 'Diseño' },
  { number: '02', title: 'Fabricación' },
  { number: '03', title: 'Montaje' },
  { number: '04', title: 'Desmontaje' },
];

/**
 * Las cuatro áreas del equipo. Van en el lugar donde la referencia pone a sus
 * miembros: no publicamos nombres de personas hasta tener sus fotos reales.
 */
export const TEAM_AREAS: TTeamArea[] = [
  {
    area: 'Diseño',
    description: 'Render y planos antes de cortar una pieza',
    image: ImgMember1,
    alt: 'Integrante del equipo de diseño de Octa Studio',
  },
  {
    area: 'Fabricación',
    description: 'Carpintería, herrería y acabados',
    image: ImgMember2,
    alt: 'Integrante del equipo de fabricación de Octa Studio',
  },
  {
    area: 'Montaje',
    description: 'Cuadrilla propia en recinto',
    image: ImgMember3,
    alt: 'Integrante del equipo de montaje de Octa Studio',
  },
  {
    area: 'Logística',
    description: 'Transporte, almacenaje y desmontaje',
    image: ImgMember4,
    alt: 'Integrante del equipo de logística de Octa Studio',
  },
];

/** Dónde montamos. Sale de `CONTACT.coverage`, que es la fuente de verdad. */
export const COVERAGE: TCoverageItem[] = [
  {
    title: CONTACT.coverage.cities[0],
    description:
      'Zona metropolitana y occidente del país. Montaje y desmontaje incluidos, con el taller a media hora del recinto.',
  },
  {
    title: CONTACT.coverage.cities[1],
    description:
      'Noreste del país. Trasladamos material y cuadrilla propia para no depender de proveedores locales.',
  },
  {
    title: CONTACT.coverage.cities[2],
    description:
      'Centro del país y los recintos de mayor aforo, donde los tiempos de montaje son más ajustados.',
  },
  {
    title: CONTACT.coverage.summary,
    description:
      'Nos movemos a donde esté el evento, dentro y fuera de México, con el mismo equipo de principio a fin.',
  },
];
