import { z } from "zod"
import { BlogCategorySchema } from "@/schemas/enums.schemas"

/* -------------------------------------------------------------------------- */
/*                            BLOQUES DE CONTENIDO                            */
/* -------------------------------------------------------------------------- */

export const ParagraphBlockSchema = z.object({
    type: z.literal('paragraph'),
    text: z.string().trim().min(1, { message: "Campo obligatorio" }),
})

export const HeadingBlockSchema = z.object({
    type: z.literal('heading'),
    text: z.string().trim().min(1, { message: "Campo obligatorio" }),
    level: z.union([z.literal(2), z.literal(3)]),
})

export const ListBlockSchema = z.object({
    type: z.literal('list'),
    ordered: z.boolean(),
    items: z.array(z.string().trim().min(1, { message: "Campo obligatorio" })).min(1, { message: "Añade al menos un elemento" }),
})

export const QuoteBlockSchema = z.object({
    type: z.literal('quote'),
    text: z.string().trim().min(1, { message: "Campo obligatorio" }),
    cite: z.string().trim().optional(),
})

export const BlogContentBlockSchema = z.discriminatedUnion('type', [
    ParagraphBlockSchema,
    HeadingBlockSchema,
    ListBlockSchema,
    QuoteBlockSchema,
])

/* -------------------------------------------------------------------------- */
/*                                    BLOG                                    */
/* -------------------------------------------------------------------------- */

export const BlogSEOFormSchema = z.object({
    metaTitle: z.string().trim().min(1, { message: "Campo obligatorio" }).max(60, { message: "Maximo 60 caracteres" }),
    metaDescription: z.string().trim().min(1, { message: "Campo obligatorio" }).max(160, { message: "Maximo 160 caracteres" }),
})

export const CreateBlogFormSchema = z.object({
    title: z.string().trim().min(1, { message: "Campo obligatorio" }),
    excerpt: z.string().trim().min(1, { message: "Campo obligatorio" }).max(300, { message: "Maximo 300 caracteres" }),
    category: BlogCategorySchema,
    // El input registra con valueAsNumber: vacio llega como NaN y cae en el error de tipo.
    readingTime: z.number({ error: "Campo obligatorio" }).int({ message: "Solo minutos enteros" }).min(1, { message: "Mínimo 1 minuto" }),
    content: z.array(BlogContentBlockSchema).min(1, { message: "Añade al menos un bloque de contenido" }),
    images: z
        .array(z.instanceof(File, { message: "Campo obligatorio" }))
        .min(1, { message: "Sube al menos una imagen" })
        .max(5, { message: "Maximo 5 imagenes" }),
    seo: BlogSEOFormSchema,
})


export const UpdateBlogFormSchema = CreateBlogFormSchema.omit({ images: true })

export const BlogImagesFormSchema = CreateBlogFormSchema.pick({ images: true })

export type TBlogContentBlock = z.infer<typeof BlogContentBlockSchema>
export type TBlogSEOForm = z.infer<typeof BlogSEOFormSchema>
export type TCreateBlogForm = z.infer<typeof CreateBlogFormSchema>
export type TUpdateBlogForm = z.infer<typeof UpdateBlogFormSchema>
export type TBlogImagesForm = z.infer<typeof BlogImagesFormSchema>
