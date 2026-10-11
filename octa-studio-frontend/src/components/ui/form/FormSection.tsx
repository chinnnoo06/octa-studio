import { ReactNode } from 'react';

type TFormSectionProps = {
  children: ReactNode;
  className?: string;
};

/** Tarjeta blanca que agrupa campos; su titulo es un `FormSectionTitle`. */
export const FormSection = ({ children, className }: TFormSectionProps) => {
  return (
    <fieldset
      className={`bg-primary m-0 flex min-w-0 flex-col gap-4 rounded-[10px] border border-slate-200 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] md:p-6.25 ${className ?? ''}`}
    >
      {children}
    </fieldset>
  );
};
