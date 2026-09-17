import { z } from "zod"
import { BLOG_CATEGORIES } from "@/utils/data/blogs"

export const BlogCategorySchema = z.enum(BLOG_CATEGORIES, { error: "Elige una categoría" })
