import { EASE_BRAND } from './base';

/**
 * El panel nunca se desmonta: cerrado queda en altura 0 para que la respuesta
 * siga en el HTML (la leen buscadores y el FAQPage del inicio).
 */
export const accordionPanel = {
  variants: {
    open: { height: 'auto', opacity: 1 },
    closed: { height: 0, opacity: 0 },
  },
  transition: { duration: 0.35, ease: EASE_BRAND },
} as const;
