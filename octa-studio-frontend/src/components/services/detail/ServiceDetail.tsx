import Image from 'next/image';
import {
  HiOutlineBuildingStorefront,
  HiOutlineSpeakerWave,
  HiOutlineTruck,
  HiOutlineUserGroup,
} from 'react-icons/hi2';
import type { IconType } from 'react-icons';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { fadeUpScale } from '@/utils/motion/reveal';
import type { TService } from '@/types/content.types';

const ICONS: Record<TService['icon'], IconType> = {
  stands: HiOutlineBuildingStorefront,
  eventos: HiOutlineSpeakerWave,
  congresos: HiOutlineUserGroup,
  montaje: HiOutlineTruck,
};

type TServiceDetailProps = {
  service: TService;
  /** Alterna la foto de lado en cada bloque. */
  flip?: boolean;
};

export const ServiceDetail = ({ service, flip = false }: TServiceDetailProps) => {
  const Icon = ICONS[service.icon];

  return (
    <div id={service.icon}
      className="border-fourth/30 grid scroll-mt-24 gap-10 border-t pt-10 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:items-center"
    >
      <Reveal
        variants={fadeUpScale}
        className={`mx-auto w-full max-w-2xl overflow-hidden rounded-xl lg:mx-0 lg:max-w-none ${flip ? 'lg:order-2' : ''}`}
      >
        <Image
          src={service.image}
          alt={service.alt}
          quality={90}
          sizes="(min-width: 1820px) 770px, (min-width: 1024px) calc(50vw - 80px), (min-width: 712px) 672px, calc(100vw - 40px)"
          className="aspect-4/3 w-full rounded-xl object-cover lg:aspect-auto lg:h-110"
        />
      </Reveal>

      <Reveal className="flex flex-col gap-10">
        <div className="flex items-center justify-between gap-5">
          <span className="text-secondary text-sm lg:text-base font-medium">{service.number}</span>

          <span
            aria-hidden="true"
            className="bg-secondary/15 text-secondary flex size-10 shrink-0 items-center justify-center rounded-full lg:size-12"
          >
            <Icon className="size-5 lg:size-6" />
          </span>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-secondary font-gentleman text-5xl leading-[0.7] font-normal tracking-[0.04em] normal-case lg:text-6xl">
            {service.title}
          </h3>

          <p className="text-fourth/75 text-base lg:text-lg">{service.description}</p>
        </div>

        <ul role="list" className="flex flex-col">
          {service.includes.map((item, i) => (
            <li key={item} className="border-fourth/30 flex gap-5 border-t py-3 last:border-b">
              <span aria-hidden="true" className="text-secondary shrink-0 text-sm lg:text-base font-medium">
                0{i + 1}
              </span>

              <p className="text-fourth/75 text-sm lg:text-base">{item}</p>
            </li>
          ))}
        </ul>

        <LinkButton href="/contacto">Pedir cotización</LinkButton>
      </Reveal>
    </div>
  );
};
