import type { Transition } from 'framer-motion';

export const EASE_BRAND: Transition['ease'] = [0.25, 0.1, 0.25, 1];

/** Viewport de todos los reveals. Lo aplica `<Reveal>`. */
export const viewportOnce = { once: true, amount: 0.3 } as const;
