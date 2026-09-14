import { z } from 'zod';

/**
 * Validación del formulario de /contacto.
 *
 * Zod 4: el correo es `z.email()` al nivel superior, no `z.string().email()`
 * como en la 3. La mayoría de ejemplos que hay por ahí siguen siendo de la 3.
 *
 * Los mensajes son los que ve el usuario, así que van en el mismo tono que el
 * resto del copy: directos y sin regañar.
 */
export const ContactFormSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, 'Dinos cómo te llamas'),

  email: z.email('Revisa el correo, parece incompleto'),

  /** Opcionales: si el usuario los deja vacíos llegan como '' y pasan. */
  telefono: z.string().trim().optional(),
  asunto: z.string().trim().optional(),

  mensaje: z
    .string()
    .trim()
    .min(10, 'Cuéntanos un poco más, con 10 caracteres nos cuesta ayudarte'),
});

export type TContactFormInput = z.infer<typeof ContactFormSchema>;
