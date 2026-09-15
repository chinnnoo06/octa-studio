import { ReactNode } from 'react';

type TFormSectionProps = {
  children: ReactNode;
  className?: string;
};

export const FormSection = ({ children, className }: TFormSectionProps) => {
  return (
    <fieldset
      className={`border-secondary/30 flex flex-col gap-5 rounded-xl border p-5 lg:p-10 ${className ?? ''}`}
    >
      {children}
    </fieldset>
  );
};
