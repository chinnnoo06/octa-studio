import { FIELD } from './Input';

/**
 * Mismo aspecto que `Input`, pero para texto largo. Existe aparte porque un
 * `<textarea>` no acepta las props de un `<input>`: `rows`, `cols` y el valor
 * como hijo en vez de atributo.
 */
type TTextareaProps = React.ComponentPropsWithRef<'textarea'>;

export const Textarea = ({ className, ...props }: TTextareaProps) => {
  return <textarea {...props} className={`${FIELD} min-h-25 resize-y leading-normal ${className ?? ''}`} />;
};
