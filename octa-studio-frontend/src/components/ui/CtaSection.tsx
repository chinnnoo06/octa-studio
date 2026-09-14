'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { TickLine } from '@/components/ui/TickLine';
import { zoomOnScroll } from '@/utils/motion/scroll';
import Img from '@/assets/media/backgrounds/ImgBackground4.webp';

export const CtaSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: zoomOnScroll.offset });
  const scale = useTransform(scrollYProgress, zoomOnScroll.range, zoomOnScroll.scale);

  return (
    <section ref={ref} data-section="cta" className="bg-primary">
      <motion.div
        style={{ scale }}
        className="bg-fourth relative flex min-h-[60vh] items-center justify-center overflow-hidden py-20 lg:min-h-screen lg:py-25"
      >
        <Image
        src={Img}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="object-cover"
      />

      <div aria-hidden="true" className="bg-fourth/25 absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-15">
        <div className="flex items-center gap-10">
          <TickLine className="text-primary hidden lg:flex" />

          <div className="flex flex-col items-start gap-5">

            <h2 className="text-primary/75 text-[2.15rem] small:text-[2.75rem] md:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] 2xl:text-[5rem] font-bold uppercase leading-[1.05] tracking-[-0.02em]">
              Construyendo ideas,{' '}
              <span className="text-primary">Creando experiencias</span>
            </h2>

            <p className="text-primary font-gentleman text-4xl lg:text-5xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
              Desde el primer boceto hasta el desmontaje.
            </p>

            <p className="text-primary/75 max-w-2xl text-base lg:text-lg">
              Escríbenos y te acompañamos en todo el proceso.
            </p>

            <PrimaryButton href="/contacto">Hablemos ahora</PrimaryButton>
          </div>
        </div>
      </div>
      </motion.div>
    </section>
  );
}
