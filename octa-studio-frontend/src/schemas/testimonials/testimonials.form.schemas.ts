import { z } from "zod"

export const TestimonialFormSchema = z.object({
    quote: z.string().trim().min(1, { message: "Campo obligatorio" }),
    name: z.string().trim().min(1, { message: "Campo obligatorio" }),
    rating: z.number({ error: "Campo obligatorio" }).int({ message: 'Debe ser un número entero' }).min(0, { message: 'Mínimo 0' }).max(5, { message: 'Máximo 5' }),
})

export type TTestimonialForm = z.infer<typeof TestimonialFormSchema>
