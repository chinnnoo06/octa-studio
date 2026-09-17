import Link from 'next/link';
import { FiImage } from 'react-icons/fi';
import { TImagesButtonProps } from '@/types/buttons.types';

/** Lleva a la pantalla de actualizar imagenes. Va aparte de `EditButton` porque
 *  el backend las trata como recurso distinto: `PATCH /:id/images`, con su
 *  propio multipart. */
export const ImagesButton = ({ href, label, className }: TImagesButtonProps) => {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`text-fourth/75 hover:bg-secondary/15 hover:text-secondary inline-flex items-center justify-center rounded-lg p-2 transition-colors duration-300 ${className ?? ''}`}
    >
      <FiImage aria-hidden="true" className="size-4.5" />
    </Link>
  );
};
