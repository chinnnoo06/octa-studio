import Link from 'next/link';
import {
  HiOutlineBuildingStorefront,
  HiOutlineSpeakerWave,
  HiOutlineTruck,
  HiOutlineUserGroup,
} from 'react-icons/hi2';
import type { IconType } from 'react-icons';
import type { TService } from '@/types/content.types';

const ICONS: Record<TService['icon'], IconType> = {
  stands: HiOutlineBuildingStorefront,
  eventos: HiOutlineSpeakerWave,
  congresos: HiOutlineUserGroup,
  montaje: HiOutlineTruck,
};

/**
 * Calca la tarjeta del original: al pasar el ratón, la tarjeta y la caja del
 * icono se intercambian los fondos y el icono crece un 10%.
 */
export const ServiceBox = ({ service }: { service: TService }) => {
  const Icon = ICONS[service.icon];

  return (
    <Link
      href={service.href}
      className="group border-fourth/30 bg-primary hover:bg-secondary/15 flex h-full min-h-62.5 items-center justify-center rounded-xl border p-3 transition-colors duration-300 sm:min-h-92.5 sm:p-5 lg:min-h-125 lg:border-0 lg:px-5 lg:py-15"
    >
      <div className="flex w-full flex-col gap-7.5 sm:gap-10 lg:gap-15">
        <span
          aria-hidden="true"
          className="bg-secondary/15 text-secondary group-hover:bg-primary ease-brand flex size-10 shrink-0 items-center justify-center rounded-md transition-colors duration-300 sm:size-20 sm:rounded-xl lg:size-37.5"
        >
          <Icon className="ease-brand size-5 transition-transform duration-300 group-hover:scale-110 sm:size-12 lg:size-22.5" />
        </span>

        <div className="flex flex-col gap-2.5 sm:gap-5 lg:gap-6">
          <h2 className="text-secondary text-xl font-semibold uppercase leading-[1.2] tracking-[-0.02em] sm:text-2xl lg:text-[2.5rem]">
            {service.title}
          </h2>

          <p className="text-fourth/75 text-sm lg:text-base">{service.description}</p>
        </div>
      </div>
    </Link>
  );
};
