import { ReactNode } from 'react';

type TFormSectionProps = {
  children: ReactNode;
  className?: string;
};

export const FormSection = ({ children, className }: TFormSectionProps) => {
  return (
    <fieldset
      className={`bg-primary-admin m-0 flex min-w-0 flex-col gap-5 rounded-xl border border-fourth-admin/30 p-5 shadow-lg ${className ?? ''}`}
    >
      {children}
    </fieldset>
  );
};
