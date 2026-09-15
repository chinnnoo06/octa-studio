import { z } from "zod";
import { PaginationSchema } from "../common/common.response.schemas";
import { BlogSchema } from "./blogs.schemas";

export const BlogsResponseSchema = z.object({
  status: z.literal("success"),
  blogs: z.array(BlogSchema),
  pagination: PaginationSchema,
});

export const BlogResponseSchema = z.object({
  status: z.literal("success"),
  blog: BlogSchema,
});

export type TBlogsResponse = z.infer<typeof BlogsResponseSchema>;
