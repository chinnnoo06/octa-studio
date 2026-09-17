import type { TService } from '@/types/content.types';
import ImgStands from '@/assets/media/stands/ImgStand12.webp';
import ImgEventos from '@/assets/media/stands/ImgStand16.webp';
import ImgCongresos from '@/assets/media/stands/ImgStand7.webp';
import ImgMontaje from '@/assets/media/stands/ImgStand11.webp';

export const SERVICES: TService[] = [
  {
    number: '01',
    icon: 'stands',
    title: 'Stands y ferias',
    description:
      'Diseñamos y fabricamos stands a medida, desde módulos compactos hasta islas de gran formato. Nos encargamos del montaje y del desmontaje en el recinto.',
    includes: [
      'Diseño y fabricación a medida',
      'Módulos compactos e islas de gran formato',
      'Montaje y desmontaje en el recinto',
    ],
    image: ImgStands,
    alt: 'Stand de gran formato en rojo y negro montado en feria',
    href: '/servicios#stands',
  },
  {
    number: '02',
    icon: 'eventos',
    title: 'Eventos masivos y shows',
    description:
      'Escenarios y estructuras propias para eventos de alto aforo; audio, iluminación y video con aliados de confianza. Nosotros coordinamos tiempos y montaje para que todo llegue listo el día del show.',
    includes: [
      'Escenarios y estructuras propias',
      'Audio, iluminación y video con aliados',
      'Un solo interlocutor para tiempos y montaje',
    ],
    image: ImgEventos,
    alt: 'Pasillo de feria con público y stands corporativos',
    href: '/servicios#eventos',
  },
  {
    number: '03',
    icon: 'congresos',
    title: 'Congresos y convenciones',
    description:
      'Salas, señalética, escenografía y zonas de registro para encuentros corporativos. Una imagen coherente en cada espacio del recinto.',
    includes: [
      'Salas y escenografía',
      'Señalética y zonas de registro',
      'Imagen coherente en todo el recinto',
    ],
    image: ImgCongresos,
    alt: 'Stand institucional con mesas de atención y rótulo central',
    href: '/servicios#congresos',
  },
  {
    number: '04',
    icon: 'montaje',
    title: 'Montaje y logística',
    description:
      'Transporte, almacenaje y equipo de montaje propio a nivel nacional e internacional. Un solo interlocutor de principio a fin.',
    includes: [
      'Transporte y almacenaje',
      'Equipo de montaje propio',
      'Cobertura nacional e internacional',
    ],
    image: ImgMontaje,
    alt: 'Equipo de Octa Building Studio montando un stand en el recinto',
    href: '/servicios#montaje',
  },
];
