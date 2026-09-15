import { z } from "zod"

export const ProjectSEOFormSchema = z.object({
    metaTitle: z.string().trim().min(1, { message: "Campo obligatorio" }).max(60, { message: "Maximo 60 caracteres" }),
    metaDescription: z.string().trim().min(1, { message: "Campo obligatorio" }).max(160, { message: "Maximo 160 caracteres" }),
})

export const CreateProjectFormSchema = z.object({
    name: z.string().trim().min(1, { message: "Campo obligatorio" }),
    description: z.string().trim().min(1, { message: "Campo obligatorio" }),
    sector: z.string().trim().min(1, { message: "Campo obligatorio" }),
    images: z
        .array(z.instanceof(File, { message: "Campo obligatorio" }))
        .min(1, { message: "Sube al menos una imagen" })
        .max(5, { message: "Maximo 5 imagenes" }),
    seo: ProjectSEOFormSchema,
})

export const UpdateProjectFormSchema = CreateProjectFormSchema.omit({ images: true })

export const ProjectImagesFormSchema = CreateProjectFormSchema.pick({ images: true })

export type TProjectImagesForm = z.infer<typeof ProjectImagesFormSchema>

export type TProjectSEOForm = z.infer<typeof ProjectSEOFormSchema>

export type TCreateProjectForm = z.infer<typeof CreateProjectFormSchema>

export type TUpdateProjectForm = z.infer<typeof UpdateProjectFormSchema>