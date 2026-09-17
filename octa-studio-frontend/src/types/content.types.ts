import type { StaticImageData } from 'next/image';
import type { IconType } from 'react-icons';
import type { BLOG_CATEGORIES } from '@/utils/data/blogs';

export type TNavLink = { label: string; href: string };

/** Enlace de la sidebar del panel. Extiende al de navegacion publica con lo
 *  que solo necesita el admin: un icono. */
export type TAdminLink = TNavLink & {
  icon: IconType;
};

export type TStat = {
  odometer: string[];
  suffix?: string;
  label: string;
  description: string;
  variant: 'one' | 'two' | 'three' | 'four';
};

export type TProject = {
  name: string;
  sector: string;
  href: string;
  image: StaticImageData;
  alt: string;
};

export type TProcessStep = {
  step: string;
  title: string;
  description: string;
  img: StaticImageData;
  alt: string;
};

export type TService = {
  number: string;
  title: string;
  description: string;
  href: string;
  /** Clave del icono y, a la vez, el ancla de su bloque en /servicios. */
  icon: 'stands' | 'eventos' | 'congresos' | 'montaje';
  /** Tres lineas, sacadas de la descripcion: lo que entra en el servicio. */
  includes: string[];
  image: StaticImageData;
  alt: string;
};

export type TTestimonial = {
  quote: string;
  name: string;
  rating: number;
};

/** Una de las categorias de `BLOG_CATEGORIES`; el tipo sale de la lista. */
export type TBlogCategory = (typeof BLOG_CATEGORIES)[number];

export type TBlogPost = {
  title: string;
  date: string;
  category: TBlogCategory;
  readingTime: string;
  excerpt: string;
  href: string;
  image: StaticImageData;
  alt: string;
};

export type TFaq = {
  question: string;
  answer: string;
};

/** Bloques de "como trabajamos" de /nosotros. */
export type TPillar = {
  number: string;
  title: string;
};

/** Areas del equipo en /nosotros. Son areas, no personas. */
export type TTeamArea = {
  area: string;
  description: string;
  image: StaticImageData;
  alt: string;
};

/** Filas de cobertura geografica de /nosotros. */
export type TCoverageItem = {
  title: string;
  description: string;
};

/** Los dos bloques de proposito de /nosotros: mision y vision. */
export type TPurpose = {
  /** Se pinta en Gentleman: nombra el bloque, no informa. */
  name: string;
  /** Una sola frase. La seccion se apoya en el tamano, no en la extension. */
  statement: string;
  points: string[];
};

/** Un canal de contacto de /contacto. `id` es tambien el ancla de su tarjeta. */
export type TChannel = {
  id: 'whatsapp' | 'telefono' | 'correo';
  /** Se pinta en Gentleman. */
  name: string;
  description: string;
  /** Texto de la pildora; abre el primer enlace. */
  action: string;
  links: { label: string; value: string; href: string }[];
};


/** Una imagen de terceros acreditada en /creditos. Cada fuente pide una
 *  atribucion distinta, de ahi la union: Freepik quiere autor y enlace al
 *  recurso; Magnific, una mencion a la herramienta. */
export type TImageCredit =
  | {
      source: 'freepik';
      /** Que imagen es, para quien lee la lista. */
      title: string;
      /** Donde se usa en el sitio. */
      usedIn: string;
      /** Autor tal como aparece en Freepik. */
      author: string;
      /** Enlace al recurso original. */
      url: string;
    }
  | {
      source: 'magnific';
      title: string;
      usedIn: string;
    };
