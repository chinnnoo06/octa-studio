import type { Transition } from 'framer-motion';

export const EASE_BRAND: Transition['ease'] = [0.25, 0.1, 0.25, 1];

export const viewportOnce = { once: true, amount: 0.15 } as const;
