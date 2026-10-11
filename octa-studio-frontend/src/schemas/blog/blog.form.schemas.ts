import { z } from "zod"
import { BlogCategorySchema, BlogStatusSchema } from "@/schemas/enums.schemas"

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const IMAGE_MAX_SIZE = 10 * 1024 * 1024

const htmlHasContent = (html: string) =>
    /<img\b/i.test(html) || html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim().length > 0

export const CreateBlogFormSchema = z.object({
    title: z.string().trim().min(1, { message: "Campo obligatorio" }),
    excerpt: z.string().trim().min(1, { message: "Campo obligatorio" }).max(300, { message: "Maximo 300 caracteres" }),
    category: BlogCategorySchema,
    status: BlogStatusSchema,
    readingTime: z.number({ error: "Campo obligatorio" }).int({ message: "Solo minutos enteros" }).min(1, { message: "Mínimo 1 minuto" }),
    content: z.string().refine(htmlHasContent, { message: "Campo Obligatorio" }),
    image: z
        .instanceof(File, { message: "Campo obligatorio" })
        .refine((file) => IMAGE_TYPES.includes(file.type), { message: "Solo JPG, PNG o WebP" })
        .refine((file) => file.size <= IMAGE_MAX_SIZE, { message: "Cada imagen debe pesar 10 MB o menos" }),
    seo: z.object({
        metaTitle: z.string().trim().min(1, { message: "Campo obligatorio" }).max(60, { message: "Maximo 60 caracteres" }),
        metaDescription: z.string().trim().min(1, { message: "Campo obligatorio" }).max(160, { message: "Maximo 160 caracteres" }),
    }),
})

export const UpdateBlogFormSchema = CreateBlogFormSchema.omit({ image: true })

export const UpdateBlogImageFormSchema = CreateBlogFormSchema.pick({ image: true })

export type TCreateBlogForm = z.infer<typeof CreateBlogFormSchema>
export type TUpdateBlogForm = z.infer<typeof UpdateBlogFormSchema>
export type TUpdateBlogImageForm = z.infer<typeof UpdateBlogImageFormSchema>
