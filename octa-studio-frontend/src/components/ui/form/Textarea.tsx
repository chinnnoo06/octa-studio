/**
 * Mismo aspecto que `Input`, pero para texto largo. Existe aparte porque un
 * `<textarea>` no acepta las props de un `<input>`: `rows`, `cols` y el valor
 * como hijo en vez de atributo.
 */
type TTextareaProps = React.ComponentPropsWithRef<'textarea'>;

export const Textarea = ({ className, ...props }: TTextareaProps) => {
  return (
    <textarea
      {...props}
      className={`w-full resize-none rounded-lg bg-white text-fourth/75 text-xs lg:text-sm leading-normal border border-secondary/50 placeholder-fourth/50 outline-none focus:border-secondary transition-all duration-300 hover:border-secondary px-5 py-2.5 ${className ?? ''}`}
    />
  );
};
