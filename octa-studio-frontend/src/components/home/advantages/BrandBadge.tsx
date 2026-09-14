'use client';

import { motion } from 'framer-motion';
import { DotRing } from '../../ui/DotRing';
import { ADVANTAGES_BADGE_TEXTS } from '@/utils/data/advantages';

const DURACION_POR_ETIQUETA = 2.32;

const VISIBLES = 2;

export const BrandBadge = () => {
  const total = ADVANTAGES_BADGE_TEXTS.length;

  const etiquetas = [...ADVANTAGES_BADGE_TEXTS, ...ADVANTAGES_BADGE_TEXTS.slice(0, VISIBLES)];

  const recorrido = `-${((total / etiquetas.length) * 100).toFixed(4)}%`;
  const duracion = total * DURACION_POR_ETIQUETA;

  return (
    <div className="relative flex size-50 items-center justify-center lg:size-55">
      <DotRing
        className="spin-slow text-secondary size-full"
        style={{ ['--spin-duration' as string]: '10s' }}
      />

      <div className="absolute inset-0 m-auto flex h-20 w-32 items-start overflow-hidden lg:h-24 lg:w-40">
        <motion.div
          className="flex w-full flex-col"
          initial={{ y: 0 }}
          animate={{ y: recorrido }}
          transition={{ duration: duracion, ease: 'linear', repeat: Infinity }}
        >
          {etiquetas.map((t, i) => (
            <span
              key={`${t}-${i}`}
              aria-hidden={i > 0}
              className="text-secondary font-gentleman text-5xl lg:text-6xl leading-[0.7] font-normal tracking-[0.04em] normal-case flex h-10 shrink-0 items-center justify-center lg:h-12"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
