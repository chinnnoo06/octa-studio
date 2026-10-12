import { z } from "zod";
import { BlogCategorySchema } from "./blogCategory.schemas";

export const BlogCategoriesResponseSchema = z.object({
  status: z.literal("success"),
  categories: z.array(BlogCategorySchema),
});

export const BlogCategoryResponseSchema = z.object({
  status: z.literal("success"),
  category: BlogCategorySchema,
});
