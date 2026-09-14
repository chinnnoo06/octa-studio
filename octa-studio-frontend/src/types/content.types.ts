import type { StaticImageData } from 'next/image';

export type TNavLink = { label: string; href: string };

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
  /** Feria o recinto donde se montó. Se muestra en la ficha de /proyectos. */
  expo: string;
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
  /** Clave del icono; se resuelve en la tarjeta de /servicios. */
  icon: 'stands' | 'eventos' | 'congresos' | 'montaje';
};

export type TTestimonial = {
  quote: string;
  name: string;
  rating: number;
};

export type TBlogPost = {
  title: string;
  date: string;
  category: string;
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
