import { z } from "zod";
import { SEOSchema } from "../common/common.schemas";

export const ProjectSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  sector: z.string(),
  slug: z.string(),
  images: z.array(z.string()),
  videos: z.array(z.string()).default([]),
  seo: SEOSchema,
});

export type TProject = z.infer<typeof ProjectSchema>;
