import { z } from "zod";
import { SEOSchema } from "../common/common.schemas";
import { BlogCategorySchema } from "@/schemas/enums.schemas";

export const BlogSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: BlogCategorySchema,
  readingTime: z.number(),
  image: z.string(),
  content: z.string(),
  seo: SEOSchema,
  createdAt: z.string(),
});

export type TBlog = z.infer<typeof BlogSchema>;
