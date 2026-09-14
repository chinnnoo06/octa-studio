'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { viewportOnce } from '@/utils/motion/base';
import { fadeUp } from '@/utils/motion/reveal';

type TRevealProps = {
  children: React.ReactNode;
  /** Cualquiera de `utils/motion/reveal`. */
  variants?: Variants;
  className?: string;
  delay?: number;
};

export const Reveal = ({ children, variants = fadeUp, className, delay }: TRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
};

/** Igual, pero anima al montar en vez de esperar al scroll. */
export const RevealOnLoad = ({ children, variants = fadeUp, className, delay }: TRevealProps) => {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate="show"
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
};
