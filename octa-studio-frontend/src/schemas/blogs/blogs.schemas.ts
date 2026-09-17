import { z } from "zod";
import { BlogContentBlockSchema } from "./blogs.form.schemas";
import { BlogCategorySchema } from "@/schemas/enums.schemas";

export const BlogSEOSchema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
});

export const BlogSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: BlogCategorySchema,
  readingTime: z.number(),
  images: z.array(z.string()),
  content: z.array(BlogContentBlockSchema),
  seo: BlogSEOSchema,
});

export type TBlog = z.infer<typeof BlogSchema>;
