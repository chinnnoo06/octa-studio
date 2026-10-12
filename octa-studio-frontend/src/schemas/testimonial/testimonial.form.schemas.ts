import { z } from "zod"
import { ImageFileSchema } from "@/schemas/common/common.form.schemas"

export const CreateTestimonialFormSchema = z.object({
    quote: z.string().trim().min(1, { message: "Campo obligatorio" }),
    name: z.string().trim().min(1, { message: "Campo obligatorio" }),
    rating: z.number({ error: "Campo obligatorio" }).int({ message: "Debe ser un número entero" }).min(0, { message: "Mínimo 0" }).max(5, { message: "Máximo 5" }),
    image: ImageFileSchema,
})

/** Al editar el logo es opcional: sin archivo nuevo se conserva el actual. */
export const UpdateTestimonialFormSchema = CreateTestimonialFormSchema.extend({
    image: ImageFileSchema.optional(),
})

export type TCreateTestimonialForm = z.infer<typeof CreateTestimonialFormSchema>
export type TUpdateTestimonialForm = z.infer<typeof UpdateTestimonialFormSchema>
