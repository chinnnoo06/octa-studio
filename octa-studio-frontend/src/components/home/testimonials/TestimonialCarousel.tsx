'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from 'react-icons/fa6';
import { TESTIMONIALS } from '@/utils/data/testimonials';

const ARROW =
  'cursor-pointer border-primary text-primary hover:bg-primary hover:text-secondary flex size-10 lg:size-12 shrink-0 items-center justify-center rounded-xl border-2 transition-colors duration-300 ';

export const TestimonialCarousel = () => {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: 'start',
    duration: 25,
    containScroll: false,
    slidesToScroll: 1,
  });
  const [selected, setSelected] = useState(0);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    onSelect();
    embla.on('select', onSelect);
    return () => {
      embla.off('select', onSelect);
    };
  }, [embla]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  return (
    <div
      className="flex w-full flex-col items-center gap-10"
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonios de clientes"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div ref={emblaRef} className="w-full overflow-hidden">
        <div className="flex">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="min-w-0 shrink-0 grow-0 basis-full"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${TESTIMONIALS.length}`}
              aria-hidden={selected !== i}
            >
       
              <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
                <FaQuoteLeft aria-hidden="true" className="text-primary/75 size-8 lg:size-10" />

                <p className="text-primary text-base text-balance lg:text-lg">
                  {t.quote}
                </p>

                <div className="flex items-center gap-1.5" aria-label={`${t.rating} de 5`}>
                  {Array.from({ length: t.rating }, (_, s) => (
                    <FaStar key={s} aria-hidden="true" className="text-primary size-4 lg:size-5" />
                  ))}
                </div>

                <p className="text-primary font-gentleman text-4xl lg:text-5xl leading-[0.7] font-normal tracking-[0.04em] normal-case">
                  {t.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button type="button" onClick={prev} aria-label="Testimonio anterior" className={ARROW}>
          <FaChevronLeft aria-hidden="true" className="size-4 lg:size-5" />
        </button>

        <ul className="flex items-center gap-2.5">
          {TESTIMONIALS.map((t, i) => (
            <li key={t.name}>
              <button
                type="button"
                onClick={() => embla?.scrollTo(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
                aria-current={selected === i}
                className={`size-2.5 rounded-full transition-colors duration-300 ${
                  selected === i ? 'bg-primary' : 'bg-primary/30 hover:bg-primary/75'
                }`}
              />
            </li>
          ))}
        </ul>

        <button type="button" onClick={next} aria-label="Testimonio siguiente" className={ARROW}>
          <FaChevronRight aria-hidden="true" className="size-4 lg:size-5" />
        </button>
      </div>
    </div>
  );
}
