import { ReactNode } from 'react';

type TFormSectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export const FormSectionTitle = ({ children, className }: TFormSectionTitleProps) => {
  return (
    <legend className={`text-fourth-admin float-left mb-1.5 w-full border-b border-fourth-admin/30 pb-5 text-base lg:text-lg font-semibold ${className ?? ''}`}>
      {children}
    </legend>
  );
};
