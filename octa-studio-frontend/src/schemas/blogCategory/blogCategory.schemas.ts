import { z } from "zod";

/** Lo que viaja de la categoria dentro de cada blog. */
export const BlogCategoryRefSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export type TBlogCategoryRef = z.infer<typeof BlogCategoryRefSchema>;

export const BlogCategorySchema = BlogCategoryRefSchema.extend({
  description: z.string().default(""),
  seo: z.object({
    metaTitle: z.string().default(""),
    metaDescription: z.string().default(""),
  }).default({ metaTitle: "", metaDescription: "" }),
  position: z.number().default(0),
  /** Solo en el listado del panel: entradas que usan la categoria. */
  totalBlogs: z.number().optional(),
});

export type TBlogCategory = z.infer<typeof BlogCategorySchema>;
