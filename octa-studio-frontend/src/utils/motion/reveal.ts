import type { Variants } from 'framer-motion';
import { EASE_BRAND } from './base';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_BRAND } },
};

export const fadeBlur: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE_BRAND } },
};

export const fadeUpScale: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE_BRAND } },
};

export const staggerParent = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});
