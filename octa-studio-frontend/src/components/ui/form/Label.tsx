type TLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};

export const Label = ({ htmlFor, children, className }: TLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-[10px] lg:text-xs font-semibold tracking-[0.18em] uppercase text-secondary mb-2 ${className ?? ''}`}
    >
      {children}
    </label>
  );
};
