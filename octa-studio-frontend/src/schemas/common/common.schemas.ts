import { z } from "zod";

export const SeoSchema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
});
