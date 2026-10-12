import { z } from "zod"
import { ImageFileSchema, SEOFormSchema, VideoFileSchema } from "@/schemas/common/common.form.schemas"

const MAX_MEDIA = 5

export const CreateProjectFormSchema = z.object({
    name: z.string().trim().min(1, { message: "Campo obligatorio" }),
    description: z.string().trim().min(1, { message: "Campo obligatorio" }),
    sector: z.string().trim().min(1, { message: "Campo obligatorio" }),
    seo: SEOFormSchema,
    images: z
        .array(ImageFileSchema)
        .min(1, { message: "Sube al menos una imagen" })
        .max(MAX_MEDIA, { message: "Maximo 5 imagenes" }),
    videos: z.array(VideoFileSchema).max(MAX_MEDIA, { message: "Maximo 5 videos" }),
})

/**
 * Edicion con medios: `keepImages`/`keepVideos` son los archivos actuales que
 * se conservan; `images`/`videos`, los nuevos. Entre ambos: 1 a 5 fotos y
 * hasta 5 videos.
 */
export const UpdateProjectFormSchema = CreateProjectFormSchema.extend({
    keepImages: z.array(z.string()),
    keepVideos: z.array(z.string()),
    images: z.array(ImageFileSchema),
    videos: z.array(VideoFileSchema),
})
    .refine((data) => data.keepImages.length + data.images.length >= 1, { message: "El proyecto necesita al menos una imagen", path: ["images"] })
    .refine((data) => data.keepImages.length + data.images.length <= MAX_MEDIA, { message: "Maximo 5 imagenes", path: ["images"] })
    .refine((data) => data.keepVideos.length + data.videos.length <= MAX_MEDIA, { message: "Maximo 5 videos", path: ["videos"] })

export type TCreateProjectForm = z.infer<typeof CreateProjectFormSchema>
export type TUpdateProjectForm = z.infer<typeof UpdateProjectFormSchema>
