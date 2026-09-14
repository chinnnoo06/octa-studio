import type { Transition } from 'framer-motion';
import { EASE_BRAND } from './base';

/**
 * Rotador de `SectionTitle`: tres copias apiladas en una ventana de una línea.
 * Recorre dos peldaños y al reiniciarse vuelve a 0; como ahí se ve la primera
 * copia, idéntica a la tercera, el salto no se nota.
 *
 * El ciclo arranca DESLIZANDO, no esperando: en cuanto el título entra en
 * pantalla la palabra se mueve. Con la pausa por delante había que esperar un
 * ciclo entero para ver que aquello estaba animado.
 */
const SLIDE = 0.9;
const HOLD = 2.6;
const CYCLE = (SLIDE + HOLD) * 2;

export const rotatorY = ['0%', '-33.3333%', '-33.3333%', '-66.6667%', '-66.6667%'];

export const rotatorTransition: Transition = {
  duration: CYCLE,
  ease: EASE_BRAND,
  times: [0, SLIDE / CYCLE, (SLIDE + HOLD) / CYCLE, (SLIDE * 2 + HOLD) / CYCLE, 1],
  repeat: Infinity,
};
