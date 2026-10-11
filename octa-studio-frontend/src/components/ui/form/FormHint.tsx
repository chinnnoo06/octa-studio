import { ReactNode } from 'react';

/** Texto explicativo bajo el titulo de una seccion del formulario. */
export const FormHint = ({ children }: { children: ReactNode }) => {
  return <p className="-mt-1.5 text-[13px] leading-[1.55] text-gray-600">{children}</p>;
};
