'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/utils/cn';
import type { TProject } from '@/types/content.types';


const SWING = [0.68, -0.55, 0.265, 1.55] as const;
const DRIFT_X = [-22, 22];
const DRIFT_Y = [-10, 10];

type TProjectRowProps = {
  project: TProject;
  /** Solo la primera fila, que es la que entra en la primera pantalla. */
  priority?: boolean;
};

export const ProjectRow = ({ project, priority = false }: TProjectRowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [hover, setHover] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 120, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 120, damping: 20, mass: 0.5 });
  const x = useTransform(sx, [0, 1], DRIFT_X);
  const y = useTransform(sy, [0, 1], DRIFT_Y);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const details = [
    { label: 'Proyecto', value: project.name },
    { label: 'Sector', value: project.sector },
    { label: 'Expo', value: project.expo },
  ];

  return (
    <Link
      href={project.href}
      aria-label={`Proyecto ${project.name}, sector ${project.sector}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group border-fourth/30 flex flex-col gap-2.5 rounded-xl border p-2.5 md:grid md:grid-cols-[3fr_1fr] md:gap-5 md:rounded-none md:border-0 md:p-0 lg:gap-7.5"
    >
      <div ref={ref} onMouseMove={onMove} className="relative overflow-hidden rounded-xl">
        <Image
          src={project.image}
          alt={project.alt}
          priority={priority}
          quality={90}
          sizes="(min-width: 1820px) 1155px, (min-width: 1024px) calc((100vw - 150px) * 0.75), (min-width: 768px) calc((100vw - 60px) * 0.75), calc(100vw - 60px)"
          className="ease-brand h-62.5 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-100 lg:h-150"
        />

        <motion.span
          aria-hidden="true"
          style={{ x, y }}
          animate={{ scale: hover && !reduced ? 1 : 0 }}
          transition={{ duration: hover ? 0.5 : 0.3, ease: SWING }}
          className="bg-secondary text-primary pointer-events-none absolute inset-0 m-auto hidden size-22.5 items-center justify-center rounded-full lg:flex"
        >
          <svg viewBox="0 0 21 21" fill="currentColor" className="size-6" aria-hidden="true">
            <path d="M1.72674 0C7.83942 0 13.9521 0 20.25 0C20.25 6.08677 20.25 12.1735 20.25 18.4448C19.1103 18.4448 17.9707 18.4448 16.7965 18.4448C16.7706 14.3265 16.7447 10.2082 16.718 5.96512C12.0299 10.6532 7.3418 15.3413 2.51163 20.1715C2.26064 20.046 2.14552 19.9819 1.96029 19.795C1.91632 19.751 1.87234 19.707 1.82703 19.6617C1.78058 19.6144 1.73413 19.5672 1.68627 19.5185C1.63794 19.4699 1.5896 19.4213 1.5398 19.3713C1.3859 19.2165 1.23255 19.0612 1.07922 18.9059C0.974805 18.8007 0.870358 18.6955 0.765875 18.5904C0.510166 18.333 0.254955 18.075 0 17.8169C0.104085 17.5862 0.216992 17.4233 0.395707 17.2449C0.44496 17.1953 0.494212 17.1457 0.544957 17.0947C0.599165 17.0409 0.653373 16.9872 0.709224 16.9318C0.76673 16.8741 0.824235 16.8165 0.883484 16.7571C1.07678 16.5636 1.27064 16.3706 1.46449 16.1776C1.60296 16.0391 1.7414 15.9007 1.87981 15.7622C2.17813 15.4638 2.47669 15.1657 2.77547 14.8678C3.20745 14.4371 3.639 14.006 4.07045 13.5747C4.77045 12.8751 5.47081 12.1757 6.17138 11.4767C6.85192 10.7976 7.5323 10.1183 8.21246 9.4388C8.27599 9.37534 8.27599 9.37534 8.3408 9.31059C8.67202 8.9797 9.00323 8.64879 9.33443 8.31789C10.9579 6.6959 12.5822 5.07475 14.2064 3.45349C10.0881 3.42759 5.96983 3.40169 1.72674 3.375C1.72674 2.26125 1.72674 1.1475 1.72674 0Z" />
          </svg>
        </motion.span>
      </div>

      <div className="md:border-fourth/30 md:bg-primary flex items-center justify-center md:rounded-xl md:border md:px-2.5 md:py-10 lg:border-0 lg:px-5">
        <dl className="flex w-full flex-col gap-2.5 sm:flex-row sm:gap-5 md:max-w-85 md:flex-col md:gap-7.5 lg:gap-15">
          {details.map((detail) => (
            <div
              key={detail.label}
              className={cn(
                'border-fourth/30 flex flex-1 items-center justify-between gap-2.5 rounded-lg border p-2.5',
                'sm:flex-col sm:items-start md:items-stretch md:gap-5 md:rounded-none md:border-0 md:p-0',
              )}
            >
              <dt className="text-fourth/75 flex items-center gap-0.5 text-sm md:w-full lg:text-base">
                {detail.label}
                <span aria-hidden="true" className="bg-fourth/30 hidden h-px w-full max-w-55 md:block" />
              </dt>

              <dd className="text-secondary text-sm font-semibold uppercase md:text-xl lg:text-2xl">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Link>
  );
};
