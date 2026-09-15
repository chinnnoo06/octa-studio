'use client';

import { useRouter } from 'next/navigation';
import { HiArrowUpRight } from 'react-icons/hi2';
import { TBackButtonProps } from './types/Buttons.types';

export const BackButton = ({ label = 'Volver', className }: TBackButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`group inline-flex w-fit cursor-pointer items-center gap-2.5 ${className ?? ''}`}
    >
      <span className="border-secondary bg-secondary text-primary group-hover:text-secondary group-hover:bg-primary inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 lg:text-base">
        {label}
      </span>

      <span
        aria-hidden="true"
        className="border-secondary bg-secondary text-primary group-hover:bg-primary group-hover:text-secondary md:bg-primary md:text-secondary ease-brand inline-flex shrink-0 items-center justify-center rounded-full border p-3.5 opacity-100 transition-all duration-300 md:-ml-14 lg:-ml-14.5 md:scale-75 md:opacity-0 md:group-hover:ml-0 md:group-hover:scale-100 md:group-hover:opacity-100"
      >
        <HiArrowUpRight className="size-4 lg:size-4.5 stroke-1" />
      </span>
    </button>
  );
};
