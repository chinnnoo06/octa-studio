'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '@/utils/cn';

const START = 0.2;
const END = 0.5;

const OVERLAP = 1.6;

const HEADING =
  'text-[1.8rem] small:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold uppercase leading-[1.2] tracking-[-0.02em] ';

const Word = ({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  const step = (END - START) / total;
  const start = START + index * step;
  const opacity = useTransform(progress, [start, start + step * OVERLAP], [0, 1]);

  return (
    <motion.span style={{ opacity }}>
      {word}
      {index < total - 1 ? ' ' : ''}
    </motion.span>
  );
};

export const WipeHeading = ({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const words = text.split(' ');

  return (
    <div ref={ref} className="relative">
      <h2 className={cn(HEADING, 'text-muted')}>{text}</h2>

      <span
        aria-hidden="true"
        className={cn(HEADING, 'text-secondary pointer-events-none absolute inset-0')}
      >
        {words.map((word, i) => (
          <Word
            key={`${word}-${i}`}
            word={word}
            index={i}
            total={words.length}
            progress={scrollYProgress}
          />
        ))}
      </span>
    </div>
  );
};
