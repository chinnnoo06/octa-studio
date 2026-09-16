'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type TOdometerProps = {
  values: readonly string[];
  suffix?: string;
  tone?: 'dark' | 'light';
}

export const Odometer = ({ values, suffix, tone = 'dark' }:TOdometerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const color = tone === 'light' ? 'text-primary' : 'text-secondary';

  return (
    <div ref={ref} className="flex items-end">
      <div data-odometer className="h-11 lg:h-13.5 overflow-hidden">
        <motion.div
          className="flex flex-col"
          initial={{ y: '-90%' }}
          animate={{ y: inView ? '0%' : '-90%' }}
          transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {values.map((v, i) => (
            <span
              key={`${v}-${i}`}
              aria-hidden={i > 0}
              className={`${color} font-semibold text-5xl lg:text-6xl block`}
            >
              {v}
            </span>
          ))}
        </motion.div>
      </div>
      {suffix ? (
        <span className={`${color} font-medium text-5xl lg:text-6xl block h-11 lg:h-13`}>
          {suffix}
        </span>
      ) : null}
    </div>
  );
}
