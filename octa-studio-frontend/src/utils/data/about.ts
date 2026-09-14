import type { TStat } from '@/types/content.types';

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
