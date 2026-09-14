import type { Variants } from 'framer-motion';
import { EASE_BRAND } from './base';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_BRAND } },
};

/** Solo aparece y se enfoca, sin recorrido. Para entradas al cargar: en la
 *  primera pantalla nada se ha movido todavía, así que el desplazamiento no
 *  tiene de dónde venir y se lee como un salto. */
export const fadeBlur: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE_BRAND },
  },
};

export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 140, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE_BRAND },
  },
};

export const fadeUpScale: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.94, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_BRAND },
  },
};

/** Escalona a los hijos. Combinar con las variantes de arriba. */
export const staggerParent = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});
