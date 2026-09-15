import { z } from "zod";
import { BlogContentBlockSchema } from "./blogs.form.schemas";

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
  category: z.string(),
  /** Solo nombres de archivo. La URL se arma con `NEXT_PUBLIC_BLOGS_IMAGE_URL`. */
  images: z.array(z.string()),
  /** Misma union discriminada que valida el formulario. */
  content: z.array(BlogContentBlockSchema),
  seo: BlogSEOSchema,
});

export type TBlog = z.infer<typeof BlogSchema>;
