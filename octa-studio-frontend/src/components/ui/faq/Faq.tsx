'use client';

import { useState } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { FAQS } from '@/utils/data/faqs';
import { FaqCard } from './FaqCard';

export const Faq = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggle = (i: number) =>
    setOpenItems((prev) => (prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]));

  return (
    <section data-section="faq" className="bg-primary py-15 lg:py-20">
      <div className="mx-auto grid max-w-[1700px] gap-10 px-5 lg:grid-cols-[1fr_2fr] lg:gap-15 lg:px-15">

        <div className="flex flex-col gap-10 lg:gap-15">
          <div className="text-secondary flex flex-col gap-2.5">
            <Eyebrow>Preguntas frecuentes</Eyebrow>
            <SectionTitle lead="Lo que más nos" rotating="preguntan" />
          </div>

          <Reveal className="bg-fourth flex flex-col items-start gap-5 rounded-xl p-5 lg:px-5 lg:py-10">
            <h3 className="text-primary text-xl font-semibold uppercase lg:text-2xl">
              ¿No encontraste tu respuesta?
            </h3>

            <p className="text-primary/75 text-sm lg:text-base">
              Escríbenos y te resolvemos la duda antes de cotizar nada. Sin compromiso.
            </p>

            <LinkButton href="/contacto">Hablemos ahora</LinkButton>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5">
          {FAQS.map((item, i) => (
            <Reveal key={item.question}>
              <FaqCard
                id={`nosotros-faq-${i}`}
                item={item}
                isOpen={openItems.includes(i)}
                onToggle={() => toggle(i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
