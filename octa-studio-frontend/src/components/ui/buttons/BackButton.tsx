'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';
import { TBackButtonProps } from './types';

/** "Volver" de las paginas de crear/editar: boton secundario del encabezado. */
export const BackButton = ({ label = 'Volver', className }: TBackButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`border-slate-200 bg-primary text-ink inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-[7px] border px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap transition-all duration-150 hover:border-gray-600 hover:bg-slate-50 ${className ?? ''}`}
    >
      <FaArrowLeft aria-hidden="true" className="size-3.25" />
      {label}
    </button>
  );
};
