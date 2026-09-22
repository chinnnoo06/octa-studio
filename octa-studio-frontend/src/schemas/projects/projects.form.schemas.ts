import { z } from "zod"

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const VIDEO_TYPES = ["video/mp4", "video/webm"]

const IMAGE_MAX_SIZE = 10 * 1024 * 1024
const VIDEO_MAX_SIZE = 50 * 1024 * 1024

export const ProjectSEOFormSchema = z.object({
    metaTitle: z.string().trim().min(1, { message: "Campo obligatorio" }).max(60, { message: "Maximo 60 caracteres" }),
    metaDescription: z.string().trim().min(1, { message: "Campo obligatorio" }).max(160, { message: "Maximo 160 caracteres" }),
})

export const ProjectVideosFieldSchema = z
    .array(
        z
            .instanceof(File, { message: "Archivo no válido" })
            .refine((file) => VIDEO_TYPES.includes(file.type), { message: "Solo MP4 o WebM" })
            .refine((file) => file.size <= VIDEO_MAX_SIZE, { message: "Cada video debe pesar 50 MB o menos" }),
    )
    .max(5, { message: "Maximo 5 videos" })

export const CreateProjectFormSchema = z.object({
    name: z.string().trim().min(1, { message: "Campo obligatorio" }),
    description: z.string().trim().min(1, { message: "Campo obligatorio" }),
    sector: z.string().trim().min(1, { message: "Campo obligatorio" }),
    images: z
        .array(
            z
                .instanceof(File, { message: "Campo obligatorio" })
                .refine((file) => IMAGE_TYPES.includes(file.type), { message: "Solo JPG, PNG o WebP" })
                .refine((file) => file.size <= IMAGE_MAX_SIZE, { message: "Cada imagen debe pesar 10 MB o menos" }),
        )
        .min(1, { message: "Sube al menos una imagen" })
        .max(5, { message: "Maximo 5 imagenes" }),
    videos: ProjectVideosFieldSchema,
    seo: ProjectSEOFormSchema,
})

export const UpdateProjectFormSchema = CreateProjectFormSchema.omit({ images: true, videos: true })

export const ProjectImagesFormSchema = CreateProjectFormSchema.pick({ images: true })

export const ProjectVideosFormSchema = CreateProjectFormSchema.pick({ videos: true })

export type TProjectImagesForm = z.infer<typeof ProjectImagesFormSchema>

export type TProjectVideosForm = z.infer<typeof ProjectVideosFormSchema>

export type TProjectSEOForm = z.infer<typeof ProjectSEOFormSchema>

export type TCreateProjectForm = z.infer<typeof CreateProjectFormSchema>

export type TUpdateProjectForm = z.infer<typeof UpdateProjectFormSchema>
