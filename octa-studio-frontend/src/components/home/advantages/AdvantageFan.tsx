'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ADVANTAGES_CORNER_IMAGES } from '@/utils/data/advantages';
import { fanKeyframes, fanTransition } from '@/utils/motion/fan';

const FAN = [
  { rotate: -12, className: '' },
  { rotate: 7, className: '-ml-10 z-10 lg:-ml-12' },
  { rotate: -5, className: '-ml-10 lg:-ml-12' },
];

export const AdvantageFan = () => {
  return (
    <div className="flex shrink-0 items-center">
      {ADVANTAGES_CORNER_IMAGES.map((img, i) => (
        <motion.div
          key={img.alt}
          className={`shrink-0 ${FAN[i].className}`}
          style={{ rotate: FAN[i].rotate }}
          animate={fanKeyframes}
          transition={fanTransition(i, FAN.length)}
        >
          <Image
            src={img.src}
            alt={img.alt}
            sizes="(min-width: 1024px) 140px, 112px"
            className="border-primary size-28 lg:size-35 rounded-xl border-4 object-cover "
          />
        </motion.div>
      ))}
    </div>
  );
};
