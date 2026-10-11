type TLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};

export const Label = ({ htmlFor, children, className }: TLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-ink mb-1.5 flex items-center gap-1 text-[13px] font-semibold ${className ?? ''}`}
    >
      {children}
    </label>
  );
};
