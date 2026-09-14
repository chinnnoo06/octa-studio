'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { staggerParent } from '@/utils/motion/reveal';
import { FAQS } from '@/utils/data/faqs';
import { FaqItem } from './FaqItem';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';

export const Faqs = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggle = (i: number) =>
    setOpenItems((prev) => (prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]));

  return (
    <section data-section="faqs" className="bg-thrird py-20 lg:py-25">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-10 px-5 lg:px-15 lg:flex-row lg:items-start ">

        <div className="flex flex-col gap-10 lg:sticky lg:top-25 lg:w-2/5 lg:shrink-0">
          <div className="text-secondary flex flex-col gap-5">
            <Eyebrow>Preguntas Frecuentes</Eyebrow>
            <SectionTitle lead="Lo que más nos" rotating="preguntan" />
            <p className="text-fourth/75 max-w-xl text-base lg:text-lg">
              Las dudas que salen en casi todas las primeras reuniones, respondidas antes de que tengas que escribirnos.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-secondary font-gentleman text-4xl lg:text-7xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
              ¿Tienes otra pregunta?
            </p>
            <PrimaryButton href="/contacto">Escríbenos</PrimaryButton>
          </div>
        </div>

        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          animate="show"
          className="w-full lg:w-3/5"
        >
          {FAQS.map((item, i) => (
            <Reveal
              key={item.question}
              delay={i * 0.05}
              className="border-fourth/30 border-b last:border-b-0"
            >
              <FaqItem
                id={`faq-${i}`}
                item={item}
                isOpen={openItems.includes(i)}
                onToggle={() => toggle(i)}
              />
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
