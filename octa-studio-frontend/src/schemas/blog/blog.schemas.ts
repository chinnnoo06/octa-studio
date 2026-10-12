import { z } from "zod";
import { SEOSchema } from "../common/common.schemas";
import { BlogStatusSchema } from "@/schemas/enums.schemas";
import { BlogCategoryRefSchema } from "@/schemas/blogCategory/blogCategory.schemas";

export const BlogSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  /** `null` = "Sin categoría". */
  category: BlogCategoryRefSchema.nullable().default(null),
  // Los blogs anteriores a estos campos no los traen: cuentan como publicados y sin vistas.
  status: BlogStatusSchema.default("published"),
  views: z.number().default(0),
  /** Calculado por el backend a partir del contenido. */
  readingTime: z.number().default(1),
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
