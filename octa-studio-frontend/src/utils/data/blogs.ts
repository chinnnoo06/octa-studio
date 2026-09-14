import type { TBlogPost } from '@/types/content';
import Img1 from '@/assets/media/renders/ImgRender1.webp';
import Img2 from '@/assets/media/stands/ImgStand5.webp';
import Img3 from '@/assets/media/stands/ImgStand6.webp';

export const BLOG_POSTS: TBlogPost[] = [
  {
    title: 'Cómo elegir el tamaño de tu stand según el presupuesto',
    date: '12 de agosto de 2026',
    category: 'Ferias',
    readingTime: '5 min',
    excerpt:
      'Metros cuadrados, altura permitida y qué recortar primero cuando el número no da. Lo que preguntamos en la primera reunión.',
    href: '/blogs/elegir-tamano-de-stand',
    image: Img1,
    alt: 'Stand de gran formato montado en feria',
  },
  {
    title: 'Qué revisar en el render antes de aprobar la fabricación',
    date: '28 de julio de 2026',
    category: 'Diseño',
    readingTime: '4 min',
    excerpt:
      'El render es el último punto barato para cambiar de opinión. Estos seis detalles son los que más caro salen si se pasan por alto.',
    href: '/blogs/revisar-el-render',
    image: Img2,
    alt: 'Render tridimensional de un stand',
  },
  {
    title: 'Montaje y desmontaje: los plazos reales de un recinto',
    date: '9 de julio de 2026',
    category: 'Montaje',
    readingTime: '6 min',
    excerpt:
      'Cuántos días da el recinto, a qué hora entra la maquinaria y por qué el desmontaje siempre es más corto de lo que parece.',
    href: '/blogs/plazos-de-montaje',
    image: Img3,
    alt: 'Equipo montando estructuras en un recinto',
  },
];

/** Copy del bloque de suscripción que cierra la sección. */
export const BLOG_NEWSLETTER = {
  title: 'No te pierdas ninguno',
  description:
    'Escribimos sobre ferias, montaje y producción cada pocas semanas. Sin spam y te puedes dar de baja cuando quieras.',
} as const;
