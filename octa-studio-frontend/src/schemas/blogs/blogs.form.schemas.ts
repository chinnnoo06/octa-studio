import { z } from "zod"

/** Las mismas ocho del enum `BlogCategory` del backend. */
export const BLOG_CATEGORIES = [
    'Diseño de Stands',
    'Montaje y Logística',
    'Materiales y Sustentabilidad',
    'Casos de Éxito / Proyectos',
    'Guías para Expositores',
    'Ferias y Eventos',
    'Tendencias en Exhibición Comercial',
    'Noticias Octa',
] as const

const REQUIRED = { message: "Campo obligatorio" }

/* -------------------------------------------------------------------------- */
/*                            BLOQUES DE CONTENIDO                            */
/* -------------------------------------------------------------------------- */

/**
 * Union discriminada por `type`, igual que el discriminador de Mongoose: cada
 * tipo de bloque declara sus propios campos y uno desconocido se rechaza.
 */
export const ParagraphBlockSchema = z.object({
    type: z.literal('paragraph'),
    text: z.string().trim().min(1, REQUIRED),
})

export const HeadingBlockSchema = z.object({
    type: z.literal('heading'),
    text: z.string().trim().min(1, REQUIRED),
    /** Solo 2 y 3: el `h1` es el titulo del blog. */
    level: z.union([z.literal(2), z.literal(3)]),
})

export const ListBlockSchema = z.object({
    type: z.literal('list'),
    ordered: z.boolean(),
    items: z.array(z.string().trim().min(1, REQUIRED)).min(1, { message: "Añade al menos un elemento" }),
})

export const QuoteBlockSchema = z.object({
    type: z.literal('quote'),
    text: z.string().trim().min(1, REQUIRED),
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
    metaTitle: z.string().trim().min(1, REQUIRED).max(60, { message: "Maximo 60 caracteres" }),
    metaDescription: z.string().trim().min(1, REQUIRED).max(160, { message: "Maximo 160 caracteres" }),
})

/**
 * Alta: con imagenes, porque el modelo exige al menos una y el `POST /blogs` las
 * recibe en el mismo multipart. El tope de 5 es el `maxCount` de multer.
 */
export const CreateBlogFormSchema = z.object({
    // Sin `slug`: lo genera el backend a partir del titulo.
    title: z.string().trim().min(1, REQUIRED),
    excerpt: z.string().trim().min(1, REQUIRED).max(300, { message: "Maximo 300 caracteres" }),
    category: z.enum(BLOG_CATEGORIES, { error: "Elige una categoría" }),
    content: z.array(BlogContentBlockSchema).min(1, { message: "Añade al menos un bloque de contenido" }),
    images: z
        .array(z.instanceof(File, REQUIRED))
        .min(1, { message: "Sube al menos una imagen" })
        .max(5, { message: "Maximo 5 imagenes" }),
    seo: BlogSEOFormSchema,
})

/**
 * Edicion: sin imagenes. El `PATCH /blogs/:id` no lleva multer y las imagenes
 * tienen su propia ruta (`PATCH /blogs/:id/images`).
 */
export const UpdateBlogFormSchema = CreateBlogFormSchema.omit({ images: true })

/** Solo las imagenes, para `PATCH /blogs/:id/images`. */
export const BlogImagesFormSchema = CreateBlogFormSchema.pick({ images: true })

export type TBlogContentBlock = z.infer<typeof BlogContentBlockSchema>
export type TBlogSEOForm = z.infer<typeof BlogSEOFormSchema>
export type TCreateBlogForm = z.infer<typeof CreateBlogFormSchema>
export type TUpdateBlogForm = z.infer<typeof UpdateBlogFormSchema>
export type TBlogImagesForm = z.infer<typeof BlogImagesFormSchema>
