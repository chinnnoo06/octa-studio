type TInputProps = React.ComponentPropsWithRef<'input'>;

const FIELD =
  'block w-full rounded-xl border border-fourth-admin/30 bg-primary-admin px-2.5 py-2.5 text-sm lg:text-base text-fourth-admin outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-fourth-admin/75 hover:border-fourth-admin/75 focus:border-secondary-admin focus:shadow-lg disabled:cursor-not-allowed disabled:bg-thrird-admin disabled:text-fourth-admin/75';

export const Input = ({ className, ...props }: TInputProps) => {
  return <input {...props} className={`${FIELD} ${className ?? ''}`} />;
};
