import { z } from "zod";
import { BlogCategorySchema } from "@/schemas/enums.schemas";

export const BlogSEOSchema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
});

export const BlogSchema = z.object({
  _id: z.string(),
  /** Lo arma el backend a partir del titulo; en el cliente solo se lee. */
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  /** Solo una de las categorias conocidas; si el backend manda otra, la respuesta no valida. */
  category: BlogCategorySchema,
  /** Minutos de lectura. */
  readingTime: z.number(),
  /** Nombre de archivo de la imagen destacada. La URL se arma con `NEXT_PUBLIC_BLOGS_IMAGE_URL`. */
  image: z.string(),
  /** HTML saneado por el backend. Las imagenes de dentro van con ruta relativa `/files/...`. */
  content: z.string(),
  seo: BlogSEOSchema,
  /** ISO. Lo pone mongoose; en las tarjetas se muestra como fecha de publicacion. */
  createdAt: z.string(),
});

export type TBlog = z.infer<typeof BlogSchema>;
