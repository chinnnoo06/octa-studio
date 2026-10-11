import { z } from "zod";

export const SEOSchema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
});
