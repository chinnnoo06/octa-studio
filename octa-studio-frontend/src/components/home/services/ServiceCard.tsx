import Link from 'next/link';
import { HiArrowUpRight } from 'react-icons/hi2';
import type { TService } from '@/types/content';

export const ServiceCard = ({ service }: { service: TService }) => {
  return (
    <Link
      href={service.href}
      className="group border-fourth/30 bg-secondary/15 hover:bg-secondary flex h-full flex-col gap-10 rounded-xl border p-5 transition-colors duration-300 lg:p-10"
    >
      <div className="flex items-center justify-between gap-5">
        <span className="text-secondary group-hover:text-primary text-sm lg:text-base font-medium transition-colors duration-300">
          {service.number}
        </span>

        <span
          aria-hidden="true"
          className="border-secondary text-secondary group-hover:border-primary group-hover:text-primary flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border px-4 transition-colors duration-300 lg:h-12 lg:px-5"
        >
          <span className="text-sm lg:text-base font-medium">Ver más</span>
          <HiArrowUpRight aria-hidden="true" className="size-4 lg:size-4.5 stroke-1" />
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-secondary group-hover:text-primary font-gentleman text-5xl lg:text-6xl p-1.5 leading-[0.7] font-normal tracking-[0.04em] normal-case transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-fourth/75 group-hover:text-primary/75 text-sm lg:text-base transition-colors duration-300">
          {service.description}
        </p>

      </div>
    </Link>
  );
};
