import type { TCoverageItem, TPillar, TStat } from '@/types/content.types';
import { CONTACT } from '@/utils/data/contact';

export const STATS: TStat[] = [
  {
    odometer: ['20', '19', '18', '17', '16', '15', '14', '13', '12', '11'],
    suffix: '+',
    label: 'Años de experiencia',
    description: 'Dos décadas diseñando y montando en todo México',
    variant: 'one',
  },
  {
    odometer: ['500', '480', '460', '440', '420', '400', '380', '360', '340', '320'],
    suffix: '+',
    label: 'Stands montados',
    description: 'De espacios compactos a montajes de gran formato',
    variant: 'two',
  },
  {
    odometer: ['300', '290', '280', '270', '260', '250', '240', '230', '220', '210'],
    suffix: '+',
    label: 'Marcas atendidas',
    description: 'Empresas expositoras nacionales como internacionales',
    variant: 'three',
  },
  {
    odometer: ['7', '4', '5', '6', '7', '8', '9', '1', '2', '7'],
    suffix: '+',
    label: 'Países de operación',
    description: 'México, Estados Unidos y clientes de Asia y Sudamérica, etc...',
    variant: 'four',
  },
];

export const COVERAGE: TCoverageItem[] = [
  {
    title: "Guadalajara",
    description:
      'Zona metropolitana y occidente del país. Montaje y desmontaje incluidos, con el taller a media hora del recinto.',
  },
  {
    title: "Monterrey",
    description:
      'Noreste del país. Trasladamos material y cuadrilla propia para no depender de proveedores locales.',
  },
  {
    title: "Ciudad de México",
    description:
      'Centro del país y los recintos de mayor aforo, donde los tiempos de montaje son más ajustados.',
  },
  {
    title: "Cobertura en todo México y en todo Estados Unidos",
    description:
      'Nos movemos a donde esté el evento, dentro y fuera de México, con el mismo equipo de principio a fin.',
  },
];

export const PILLARS: TPillar[] = [
  { number: '01', title: 'Diseño' },
  { number: '02', title: 'Fabricación' },
  { number: '03', title: 'Montaje' },
  { number: '04', title: 'Desmontaje' },
];