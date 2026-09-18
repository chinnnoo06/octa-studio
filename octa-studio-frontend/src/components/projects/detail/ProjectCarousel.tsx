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

  const many = project.images.length > 1;

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
          aria-label={`Fotos del proyecto ${project.name}`}
          tabIndex={many ? 0 : undefined}
          onKeyDown={many ? onKeyDown : undefined}
        >
          <div ref={emblaRef} className="overflow-hidden rounded-xl">
            <div className="flex">
              {project.images.map((image, i) => (
                <div
                  key={image}
                  className="min-w-0 shrink-0 grow-0 basis-full"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} de ${project.images.length}`}
                  aria-hidden={selected !== i}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_PROJECTS_IMAGE_URL}/${image}`}
                    alt={`Proyecto ${project.name}, foto ${i + 1}`}
                    width={1920}
                    height={1080}
                    priority={i === 0}
                    sizes="(min-width: 1272px) 1152px, (min-width: 1024px) calc(100vw - 120px), calc(100vw - 40px)"
                    className="aspect-4/3 w-full object-cover lg:aspect-auto lg:h-160"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {many && (
          <div className="flex items-center gap-5">
            <button type="button" onClick={prev} aria-label="Foto anterior" className={ARROW}>
              <FaChevronLeft aria-hidden="true" className="size-4 lg:size-5" />
            </button>

            <ul className="flex items-center gap-2.5">
              {project.images.map((image, i) => (
                <li key={image}>
                  <button
                    type="button"
                    onClick={() => embla?.scrollTo(i)}
                    aria-label={`Ir a la foto ${i + 1}`}
                    aria-current={selected === i}
                    className={`size-2.5 rounded-full transition-colors duration-300 ${
                      selected === i ? 'bg-secondary' : 'bg-secondary/30 hover:bg-secondary/75'
                    }`}
                  />
                </li>
              ))}
            </ul>

            <button type="button" onClick={next} aria-label="Foto siguiente" className={ARROW}>
              <FaChevronRight aria-hidden="true" className="size-4 lg:size-5" />
            </button>
          </div>
        )}
      </Reveal>
    </section>
  );
};
