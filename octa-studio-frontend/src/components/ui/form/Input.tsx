type TInputProps = React.ComponentPropsWithRef<'input'>;

/** Campo del panel; `FIELD` lo comparten textarea y select. */
export const FIELD =
  'block w-full rounded-[7px] border border-slate-200 bg-white px-3.25 py-2.5 text-[14px] text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-slate-400 hover:border-slate-300 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(24,96,140,0.12)] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-600';

export const Input = ({ className, ...props }: TInputProps) => {
  return <input {...props} className={`${FIELD} ${className ?? ''}`} />;
};
