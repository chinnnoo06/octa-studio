import { z } from "zod"
import { SEOFormSchema } from "@/schemas/common/common.form.schemas"

export const BlogCategoryFormSchema = z.object({
    name: z.string().trim().min(1, { message: "El nombre de la categoría es obligatorio." }).max(150, { message: "El nombre no puede exceder los 150 caracteres." }),
    description: z.string().trim().min(1, { message: "Campo obligatorio" }).max(300, { message: "Máximo 300 caracteres" }),
    // Opcional: vacio, el backend lo genera a partir del nombre y la descripcion.
    seo: SEOFormSchema,
})

export type TBlogCategoryForm = z.infer<typeof BlogCategoryFormSchema>
