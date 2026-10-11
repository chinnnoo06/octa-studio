import { z } from "zod";
import { PaginationSchema } from "../common/common.response.schemas";
import { BlogSchema, BlogStatsSchema } from "./blog.schemas";

export const BlogsResponseSchema = z.object({
  status: z.literal("success"),
  blogs: z.array(BlogSchema),
  pagination: PaginationSchema,
});

export type TBlogsResponse = z.infer<typeof BlogsResponseSchema>;

export const BlogStatsResponseSchema = z.object({
  status: z.literal("success"),
  stats: BlogStatsSchema,
});
