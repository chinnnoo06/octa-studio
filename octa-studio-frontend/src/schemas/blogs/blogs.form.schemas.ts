import { z } from "zod"
import { BlogCategorySchema } from "@/schemas/enums.schemas"

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

/** El editor devuelve HTML; esta vacio si no queda texto ni imagenes. */
const htmlHasContent = (html: string) =>
    /<img\b/i.test(html) || html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim().length > 0

export const BlogSEOFormSchema = z.object({
    metaTitle: z.string().trim().min(1, { message: "Campo obligatorio" }).max(60, { message: "Maximo 60 caracteres" }),
    metaDescription: z.string().trim().min(1, { message: "Campo obligatorio" }).max(160, { message: "Maximo 160 caracteres" }),
})

export const BlogImageFieldSchema = z
    .instanceof(File, { message: "Campo obligatorio" })
    .refine((file) => IMAGE_TYPES.includes(file.type), { message: "Solo JPG, PNG o WebP" })

export const CreateBlogFormSchema = z.object({
    title: z.string().trim().min(1, { message: "Campo obligatorio" }),
    excerpt: z.string().trim().min(1, { message: "Campo obligatorio" }).max(300, { message: "Maximo 300 caracteres" }),
    category: BlogCategorySchema,
    // El input registra con valueAsNumber: vacio llega como NaN y cae en el error de tipo.
    readingTime: z.number({ error: "Campo obligatorio" }).int({ message: "Solo minutos enteros" }).min(1, { message: "Mínimo 1 minuto" }),
    /** HTML tal cual sale de TinyMCE; el backend lo sanea. */
    content: z.string().refine(htmlHasContent, { message: "Escribe el contenido del artículo" }),
    /** Una sola imagen destacada. */
    image: BlogImageFieldSchema,
    seo: BlogSEOFormSchema,
})

export const UpdateBlogFormSchema = CreateBlogFormSchema.omit({ image: true })

export const BlogImageFormSchema = CreateBlogFormSchema.pick({ image: true })

export type TBlogSEOForm = z.infer<typeof BlogSEOFormSchema>
export type TCreateBlogForm = z.infer<typeof CreateBlogFormSchema>
export type TUpdateBlogForm = z.infer<typeof UpdateBlogFormSchema>
export type TBlogImageForm = z.infer<typeof BlogImageFormSchema>
