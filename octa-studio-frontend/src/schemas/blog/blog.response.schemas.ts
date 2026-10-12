import { z } from "zod";
import { PaginationSchema } from "../common/common.response.schemas";
import { BlogStatsSchema, BlogSummarySchema } from "./blog.schemas";

export const BlogsResponseSchema = z.object({
  status: z.literal("success"),
  blogs: z.array(BlogSummarySchema),
  pagination: PaginationSchema,
});

export type TBlogsResponse = z.infer<typeof BlogsResponseSchema>;

export const RelatedBlogsResponseSchema = z.object({
  status: z.literal("success"),
  blogs: z.array(BlogSummarySchema),
});

export const BlogStatsResponseSchema = z.object({
  status: z.literal("success"),
  stats: BlogStatsSchema,
});
