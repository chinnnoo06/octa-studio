import type { TProject } from '@/types/content';
import ImgAgrokorita from '@/assets/media/stands/ImgStand9.webp';
import ImgTemisa from '@/assets/media/stands/ImgStand10.webp';
import ImgToyoKasei from '@/assets/media/stands/ImgStand4.webp';
import ImgPcp from '@/assets/media/stands/ImgStand8.webp';

/**
 * Catálogo de proyectos. Lo consumen la sección de la home (las 4 primeras) y
 * la página /proyectos, que los lista paginados de 5 en 5.
 *
 * TODO: `expo` está sin rellenar en las cuatro fichas — hay que poner la feria
 * o el recinto real de cada montaje. Se ve en la ficha de /proyectos.
 */
export const PROJECTS: TProject[] = [
  {
    name: 'Agrokorita',
    sector: 'Agro',
    expo: 'Por confirmar',
    href: '/proyectos',
    image: ImgAgrokorita,
    alt: 'Stand de Agrokorita con frente amarillo y verde e iluminación LED perimetral',
  },
  {
    name: 'Temisa',
    sector: 'Agro',
    expo: 'Por confirmar',
    href: '/proyectos',
    image: ImgTemisa,
    alt: 'Stand de Temisa en blanco y verde con vitrina de producto retroiluminada',
  },
  {
    name: 'Toyo Kasei',
    sector: 'Ferretera',
    expo: 'Por confirmar',
    href: '/proyectos',
    image: ImgToyoKasei,
    alt: 'Stand de Toyo Kasei con maquinaria de flejado y panelado azul',
  },
  {
    name: 'Pcp',
    sector: 'Ferretera',
    expo: 'Por confirmar',
    href: '/proyectos',
    image: ImgPcp,
    alt: 'Stand de PCP con mostrador iluminado y exhibidores de válvulas',
  },
];
