import { ReactNode } from 'react';

type TFormSectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export const FormSectionTitle = ({ children, className }: TFormSectionTitleProps) => {
  return (
    <legend className={`text-secondary px-2.5 text-sm lg:text-base font-semibold uppercase  ${className ?? ''}`}>
      {children}
    </legend>
  );
};
