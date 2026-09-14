'use client';

/**
 * FAQ de paginas interiores: columna de titulo + tarjetas acordeon. La de la
 * home, con el titulo pegajoso y las filas separadas, vive en `ui/faqs`.
 */

import { useState } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { FAQS } from '@/utils/data/faqs';
import { FaqCard } from './FaqCard';

export const Faq = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggle = (i: number) =>
    setOpenItems((prev) => (prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]));

  return (
    <section data-section="faq" className="bg-primary py-20 lg:py-25">
      <div className="mx-auto grid max-w-[1700px] gap-10 px-5 lg:grid-cols-[1fr_2fr] lg:gap-15 lg:px-15">

        <div className="flex flex-col gap-10 lg:gap-15">
          <div className="text-secondary flex flex-col gap-5">
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

            <PrimaryButton href="/contacto">Hablemos ahora</PrimaryButton>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5">
          {FAQS.map((item, i) => (
            <Reveal key={item.question} delay={i * 0.05}>
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
