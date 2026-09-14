import type { Transition } from 'framer-motion';
import { EASE_BRAND } from './base';


const CYCLE = 4; // segundos de la vuelta completa
const PRE = 0.2; // respiro antes de la primera
const MOVE = 0.6; // lo que tarda una en entrar o salir
const GAP = 0.2; // separación entre una y la siguiente
const HOLD = 1.2; // con todas a la vista
const TAIL = 0.05; // hueco vacío antes de repetir

export const fanKeyframes = {
  opacity: [0, 0, 1, 1, 0, 0],
  scale: [0.85, 0.85, 1, 1, 0.85, 0.85],
};

export const fanTimes = (i: number, total: number) => {
  const step = MOVE + GAP;
  const allIn = PRE + total * step - GAP;
  const allOut = allIn + HOLD + (total - 1) * step + MOVE;
  const totalTime = allOut + TAIL;

  const enterAt = PRE + i * step;
  const exitAt = allIn + HOLD + i * step;

  return [0, enterAt, enterAt + MOVE, exitAt, exitAt + MOVE, totalTime].map(
    (t) => t / totalTime,
  );
};

export const fanTransition = (i: number, total: number): Transition => ({
  duration: CYCLE,
  times: fanTimes(i, total),
  ease: EASE_BRAND,
  repeat: Infinity,
});
