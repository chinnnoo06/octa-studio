import { z } from "zod"

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const IMAGE_MAX_SIZE = 10 * 1024 * 1024

const VIDEO_TYPES = ["video/mp4", "video/webm"]
const VIDEO_MAX_SIZE = 50 * 1024 * 1024

export const CreateProjectFormSchema = z.object({
    name: z.string().trim().min(1, { message: "Campo obligatorio" }),
    description: z.string().trim().min(1, { message: "Campo obligatorio" }),
    sector: z.string().trim().min(1, { message: "Campo obligatorio" }),
    seo: z.object({
        metaTitle: z.string().trim().min(1, { message: "Campo obligatorio" }).max(60, { message: "Maximo 60 caracteres" }),
        metaDescription: z.string().trim().min(1, { message: "Campo obligatorio" }).max(160, { message: "Maximo 160 caracteres" }),
    }),
    images: z
        .array(
            z
                .instanceof(File, { message: "Campo obligatorio" })
                .refine((file) => IMAGE_TYPES.includes(file.type), { message: "Solo JPG, PNG o WebP" })
                .refine((file) => file.size <= IMAGE_MAX_SIZE, { message: "Cada imagen debe pesar 10 MB o menos" }),
        )
        .min(1, { message: "Sube al menos una imagen" })
        .max(5, { message: "Maximo 5 imagenes" }),
    videos: z
        .array(
            z
                .instanceof(File, { message: "Archivo no válido" })
                .refine((file) => VIDEO_TYPES.includes(file.type), { message: "Solo MP4 o WebM" })
                .refine((file) => file.size <= VIDEO_MAX_SIZE, { message: "Cada video debe pesar 50 MB o menos" }),
        )
        .max(5, { message: "Maximo 5 videos" }),
})

export const UpdateProjectFormSchema = CreateProjectFormSchema.omit({ images: true, videos: true })

export const UpdateProjectImagesFormSchema = CreateProjectFormSchema.pick({ images: true })

export const UpdateProjectVideosFormSchema = CreateProjectFormSchema.pick({ videos: true })

export type TCreateProjectForm = z.infer<typeof CreateProjectFormSchema>
export type TUpdateProjectForm = z.infer<typeof UpdateProjectFormSchema>
export type TUpdateProjectImagesForm = z.infer<typeof UpdateProjectImagesFormSchema>
export type TUpdateProjectVideosForm = z.infer<typeof UpdateProjectVideosFormSchema>
