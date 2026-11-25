import { z } from "zod";

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
  totalBlogs: z.number().optional(),
});

export type TBlogCategory = z.infer<typeof BlogCategorySchema>;
