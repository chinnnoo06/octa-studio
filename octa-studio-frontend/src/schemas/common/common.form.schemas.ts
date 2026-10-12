import { z } from "zod"

export const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
export const IMAGE_MAX_SIZE = 10 * 1024 * 1024

export const VIDEO_TYPES = ["video/mp4", "video/webm"]
export const VIDEO_MAX_SIZE = 50 * 1024 * 1024

export const ImageFileSchema = z
    .instanceof(File, { message: "Campo obligatorio" })
    .refine((file) => IMAGE_TYPES.includes(file.type), { message: "Solo JPG, PNG o WebP" })
    .refine((file) => file.size <= IMAGE_MAX_SIZE, { message: "Cada imagen debe pesar 10 MB o menos" })

export const VideoFileSchema = z
    .instanceof(File, { message: "Archivo no válido" })
    .refine((file) => VIDEO_TYPES.includes(file.type), { message: "Solo MP4 o WebM" })
    .refine((file) => file.size <= VIDEO_MAX_SIZE, { message: "Cada video debe pesar 50 MB o menos" })

/**
 * SEO opcional: lo que se deje vacio lo completa el backend con el titulo y
 * el resumen (extracto o descripcion), recortados a 60 y 160 caracteres.
 */
export const SEOFormSchema = z.object({
    metaTitle: z.string().trim().max(60, { message: "Maximo 60 caracteres" }),
    metaDescription: z.string().trim().max(160, { message: "Maximo 160 caracteres" }),
})
