import { z } from "zod";
import { SeoSchema } from "../common/common.schemas";

export const ProjectSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  sector: z.string(),
  slug: z.string(),
  images: z.array(z.string()),
  videos: z.array(z.string()).default([]),
  seo: SeoSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TProject = z.infer<typeof ProjectSchema>;
