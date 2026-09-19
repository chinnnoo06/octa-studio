import { z } from "zod"

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const TestimonialImageFieldSchema = z
    .instanceof(File, { message: "Campo obligatorio" })
    .refine((file) => IMAGE_TYPES.includes(file.type), { message: "Solo JPG, PNG o WebP" })

export const CreateTestimonialFormSchema = z.object({
    quote: z.string().trim().min(1, { message: "Campo obligatorio" }),
    name: z.string().trim().min(1, { message: "Campo obligatorio" }),
    rating: z.number({ error: "Campo obligatorio" }).int({ message: 'Debe ser un número entero' }).min(0, { message: 'Mínimo 0' }).max(5, { message: 'Máximo 5' }),
    /** Logo o foto de la empresa: una sola. */
    image: TestimonialImageFieldSchema,
})

export const UpdateTestimonialFormSchema = CreateTestimonialFormSchema.omit({ image: true })

export const TestimonialImageFormSchema = CreateTestimonialFormSchema.pick({ image: true })

export type TCreateTestimonialForm = z.infer<typeof CreateTestimonialFormSchema>
export type TUpdateTestimonialForm = z.infer<typeof UpdateTestimonialFormSchema>
export type TTestimonialImageForm = z.infer<typeof TestimonialImageFormSchema>
