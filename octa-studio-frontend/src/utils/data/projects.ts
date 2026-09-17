import type { TProject } from '@/types/content.types';
import ImgAgrokorita from '@/assets/media/stands/ImgStand9.webp';
import ImgTemisa from '@/assets/media/stands/ImgStand10.webp';
import ImgToyoKasei from '@/assets/media/stands/ImgStand4.webp';
import ImgPcp from '@/assets/media/stands/ImgStand8.webp';

export const PROJECTS: TProject[] = [
  {
    name: 'Agrokorita',
    sector: 'Agro',
    href: '/proyectos',
    image: ImgAgrokorita,
    alt: 'Stand de Agrokorita con frente amarillo y verde e iluminación LED perimetral',
  },
  {
    name: 'Temisa',
    sector: 'Agro',
    href: '/proyectos',
    image: ImgTemisa,
    alt: 'Stand de Temisa en blanco y verde con vitrina de producto retroiluminada',
  },
  {
    name: 'Toyo Kasei',
    sector: 'Ferretera',
    href: '/proyectos',
    image: ImgToyoKasei,
    alt: 'Stand de Toyo Kasei con maquinaria de flejado y panelado azul',
  },
  {
    name: 'Pcp',
    sector: 'Ferretera',
    href: '/proyectos',
    image: ImgPcp,
    alt: 'Stand de PCP con mostrador iluminado y exhibidores de válvulas',
  },
];
