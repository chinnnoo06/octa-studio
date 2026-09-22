import type { Transition } from 'framer-motion';
import { EASE_BRAND } from './base';

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
