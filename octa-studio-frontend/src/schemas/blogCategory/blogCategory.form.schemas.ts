import { z } from "zod"

export const BlogCategoryFormSchema = z.object({
    name: z.string().trim().min(1, { message: "El nombre de la categoría es obligatorio." }).max(150, { message: "El nombre no puede exceder los 150 caracteres." }),
    // Vacio: el backend lo genera a partir del nombre.
    slug: z.string().trim().regex(/^([a-z0-9]+(?:-[a-z0-9]+)*)?$/, { message: "El slug solo puede contener letras minúsculas, números y guiones." }),
    description: z.string().trim().max(300, { message: "Máximo 300 caracteres" }),
    seo: z.object({
        metaTitle: z.string().trim().max(60, { message: "Maximo 60 caracteres" }),
        metaDescription: z.string().trim().max(160, { message: "Maximo 160 caracteres" }),
    }),
})

export type TBlogCategoryForm = z.infer<typeof BlogCategoryFormSchema>
