type TLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};

export const Label = ({ htmlFor, children, className }: TLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-fourth-admin mb-1.5 flex items-center gap-1.5 text-xs lg:text-sm font-semibold ${className ?? ''}`}
    >
      {children}
    </label>
  );
};
