import { EASE_BRAND } from './base';

export const accordionPanel = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.35, ease: EASE_BRAND },
} as const;
