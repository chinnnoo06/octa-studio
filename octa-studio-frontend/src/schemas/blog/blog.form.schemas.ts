import { z } from "zod"
import { BlogStatusSchema } from "@/schemas/enums.schemas"
import { ImageFileSchema, SEOFormSchema } from "@/schemas/common/common.form.schemas"

const htmlHasContent = (html: string) =>
    /<img\b/i.test(html) || html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim().length > 0

export const CreateBlogFormSchema = z.object({
    title: z.string().trim().min(1, { message: "Campo obligatorio" }),
    // Opcional: vacio, el backend lo genera a partir del contenido.
    excerpt: z.string().trim().max(300, { message: "Maximo 300 caracteres" }),
    // Id de la categoria; vacio = "Sin categoría".
    category: z.string(),
    status: BlogStatusSchema,
    content: z.string().refine(htmlHasContent, { message: "Campo Obligatorio" }),
    image: ImageFileSchema,
    seo: SEOFormSchema,
})

/** Al editar la imagen es opcional: sin archivo nuevo se conserva la actual. */
export const UpdateBlogFormSchema = CreateBlogFormSchema.extend({
    image: ImageFileSchema.optional(),
})

export type TCreateBlogForm = z.infer<typeof CreateBlogFormSchema>
export type TUpdateBlogForm = z.infer<typeof UpdateBlogFormSchema>
