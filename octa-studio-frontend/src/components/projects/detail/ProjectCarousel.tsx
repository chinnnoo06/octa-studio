'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Reveal } from '@/components/ui/Reveal';
import { fadeUpScale } from '@/utils/motion/reveal';
import type { TProject } from '@/schemas/projects/projects.schemas';

const ARROW =
  'cursor-pointer border-secondary text-secondary hover:bg-secondary hover:text-primary flex size-10 lg:size-12 shrink-0 items-center justify-center rounded-xl border-2 transition-colors duration-300';

/** El marco siempre mide lo mismo; el medio se ajusta dentro sin recortarse. */
const FRAME = 'relative aspect-4/3 w-full overflow-hidden bg-fourth lg:aspect-auto lg:h-160';

/** Fondo: el mismo medio desenfocado, para que un vertical no deje bandas planas. */
const BACKDROP = 'absolute inset-0 size-full scale-110 object-cover opacity-60 blur-2xl';

type TSlide = { kind: 'image' | 'video'; file: string };

export const ProjectCarousel = ({ project }: { project: TProject }) => {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start', duration: 25 });
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

  // Primero las fotos y despues los videos, todos del mismo tamano.
  const slides: TSlide[] = [
    ...project.images.map((file) => ({ kind: 'image' as const, file })),
    ...project.videos.map((file) => ({ kind: 'video' as const, file })),
  ];

  const many = slides.length > 1;

  return (
    <section data-section="project-gallery" className="bg-primary py-15 lg:py-20">
      <Reveal
        variants={fadeUpScale}
        className="mx-auto flex w-full max-w-[1700px] flex-col items-center gap-10 px-5 lg:px-15"
      >
        <div
          className="w-full max-w-6xl"
          role="region"
          aria-roledescription="carousel"
          aria-label={`Galería del proyecto ${project.name}`}
          tabIndex={many ? 0 : undefined}
          onKeyDown={many ? onKeyDown : undefined}
        >
          <div ref={emblaRef} className="overflow-hidden rounded-xl">
            <div className="flex">
              {slides.map((slide, i) => (
                <div
                  key={slide.file}
                  className="min-w-0 shrink-0 grow-0 basis-full"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} de ${slides.length}`}
                  aria-hidden={selected !== i}
                >
                  <div className={FRAME}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_PROJECTS_IMAGE_URL}/${slide.kind === 'image' ? slide.file : project.images[0]}`}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(min-width: 1272px) 1152px, (min-width: 1024px) calc(100vw - 120px), calc(100vw - 40px)"
                      className={BACKDROP}
                    />

                    {slide.kind === 'image' ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_PROJECTS_IMAGE_URL}/${slide.file}`}
                        alt={`Proyecto ${project.name}, foto ${i + 1}`}
                        fill
                        priority={i === 0}
                        sizes="(min-width: 1272px) 1152px, (min-width: 1024px) calc(100vw - 120px), calc(100vw - 40px)"
                        className="object-contain"
                      />
                    ) : (
                      <video
                        src={`${process.env.NEXT_PUBLIC_PROJECTS_VIDEO_URL}/${slide.file}`}
                        controls
                        playsInline
                        preload="metadata"
                        aria-label={`Proyecto ${project.name}, video`}
                        className="relative size-full object-contain"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {many && (
          <div className="flex items-center gap-5">
            <button type="button" onClick={prev} aria-label="Anterior" className={ARROW}>
              <FaChevronLeft aria-hidden="true" className="size-4 lg:size-5" />
            </button>

            <ul className="flex items-center gap-2.5">
              {slides.map((slide, i) => (
                <li key={slide.file}>
                  <button
                    type="button"
                    onClick={() => embla?.scrollTo(i)}
                    aria-label={`Ir a ${slide.kind === 'video' ? 'el video' : 'la foto'} ${i + 1}`}
                    aria-current={selected === i}
                    className={`size-2.5 rounded-full transition-colors duration-300 ${
                      selected === i ? 'bg-secondary' : 'bg-secondary/30 hover:bg-secondary/75'
                    }`}
                  />
                </li>
              ))}
            </ul>

            <button type="button" onClick={next} aria-label="Siguiente" className={ARROW}>
              <FaChevronRight aria-hidden="true" className="size-4 lg:size-5" />
            </button>
          </div>
        )}
      </Reveal>
    </section>
  );
};
