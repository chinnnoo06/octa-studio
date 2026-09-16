'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { Reveal } from '@/components/ui/Reveal';
import { fadeBlur } from '@/utils/motion/reveal';
import Img from '@/assets/media/backgrounds/ImgBackground1.webp';

const RANGE_X = ['-60%', '60%'];
const RANGE_Y = ['-80%', '80%'];

export const BannerLogo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 55, damping: 22, mass: 0.8 });
  const sy = useSpring(py, { stiffness: 55, damping: 22, mass: 0.8 });
  const x = useTransform(sx, [0, 1], RANGE_X);
  const y = useTransform(sy, [0, 1], RANGE_Y);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <Reveal variants={fadeBlur}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative overflow-hidden rounded-xl lg:rounded-none"
      >
        <Image
          src={Img}
          alt=""
          priority
          quality={90}
          sizes="100vw"
          placeholder="blur"
          className="h-62.5 w-full object-cover sm:h-85 lg:h-178.5"
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div style={{ x, y }} className="w-50 lg:w-100">
            <Logo sizes="(min-width: 1024px) 400px, 200px" />
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
};
