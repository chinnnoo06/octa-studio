/**
 * Contenido de la sección Services de la home.
 */

import type { TService } from '@/types/content';

export const SERVICES: TService[] = [
  {
    number: '01',
    icon: 'stands',
    title: 'Stands y ferias',
    description:
      'Diseñamos y fabricamos stands a medida, desde módulos compactos hasta islas de gran formato. Nos encargamos del montaje y del desmontaje en el recinto.',
    href: '/servicios/stands',
  },
  {
    number: '02',
    icon: 'eventos',
    title: 'Eventos masivos y shows',
    description:
      'Escenarios, estructuras, audio, iluminación y video para eventos de alto aforo. Coordinamos proveedores y tiempos para que todo llegue listo el día del show.',
    href: '/servicios/eventos',
  },
  {
    number: '03',
    icon: 'congresos',
    title: 'Congresos y convenciones',
    description:
      'Salas, señalética, escenografía y zonas de registro para encuentros corporativos. Una imagen coherente en cada espacio del recinto.',
    href: '/servicios/congresos',
  },
  {
    number: '04',
    icon: 'montaje',
    title: 'Montaje y logística',
    description:
      'Transporte, almacenaje y equipo de montaje propio a nivel nacional e internacional. Un solo interlocutor de principio a fin.',
    href: '/servicios/montaje',
  },
];
