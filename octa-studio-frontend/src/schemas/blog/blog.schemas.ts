import { z } from "zod";
import { SEOSchema } from "../common/common.schemas";
import { BlogCategorySchema, BlogStatusSchema } from "@/schemas/enums.schemas";

export const BlogSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: BlogCategorySchema,
  // Los blogs anteriores a estos campos no los traen: cuentan como publicados y sin vistas.
  status: BlogStatusSchema.default("published"),
  views: z.number().default(0),
  readingTime: z.number(),
  image: z.string(),
  content: z.string(),
  seo: SEOSchema,
  createdAt: z.string(),
});

export type TBlog = z.infer<typeof BlogSchema>;

/** Bloque "Blog" del dashboard: datos internos, no de Google Analytics. */
export const BlogStatsSchema = z.object({
  total: z.number(),
  published: z.number(),
  drafts: z.number(),
  totalViews: z.number(),
  mostRead: z.array(z.object({
    _id: z.string(),
    title: z.string(),
    slug: z.string(),
    views: z.number(),
  })),
  latest: z.object({
    _id: z.string(),
    title: z.string(),
    slug: z.string(),
    createdAt: z.string(),
  }).nullable(),
});

export type TBlogStats = z.infer<typeof BlogStatsSchema>;
