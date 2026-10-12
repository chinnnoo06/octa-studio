import { z } from "zod";
import { SEOSchema } from "../common/common.schemas";
import { BlogStatusSchema } from "@/schemas/enums.schemas";
import { BlogCategoryRefSchema } from "@/schemas/blogCategory/blogCategory.schemas";

export const BlogSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: BlogCategoryRefSchema.nullable().default(null),
  status: BlogStatusSchema.default("published"),
  views: z.number().default(0),
  readingTime: z.number().default(1),
  image: z.string(),
  content: z.string(),
  seo: SEOSchema,
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export type TBlog = z.infer<typeof BlogSchema>;

export const BlogSummarySchema = BlogSchema.omit({ content: true });

export type TBlogSummary = z.infer<typeof BlogSummarySchema>;

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
