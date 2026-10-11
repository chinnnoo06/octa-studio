import { ReactNode } from 'react';

type TFormSectionTitleProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Titulo de la tarjeta con su linea divisoria. `float-left` saca al legend del
 * borde del fieldset; dentro de un fieldset flex queda como primer elemento.
 */
export const FormSectionTitle = ({ children, className }: TFormSectionTitleProps) => {
  return (
    <legend className={`text-ink float-left mb-1 w-full border-b border-slate-100 pb-3.75 text-[16px] font-semibold md:text-[17px] ${className ?? ''}`}>
      {children}
    </legend>
  );
};
