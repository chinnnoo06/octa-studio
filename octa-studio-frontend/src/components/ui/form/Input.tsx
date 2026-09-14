type TInputProps = React.ComponentPropsWithRef<'input'>;

export const Input = ({ className, ...props }: TInputProps) => {
  return (
    <input
      {...props}
      className={`w-full rounded-lg bg-white text-fourth/75 text-xs lg:text-sm leading-normal border border-secondary/50 placeholder-fourth/50 outline-none focus:border-secondary transition-all duration-300 hover:border-secondary px-5 py-2.5 ${className ?? ''}`}
    />
  );
};
