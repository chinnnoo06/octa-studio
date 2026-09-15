import { z } from "zod";

export const ProjectSEOSchema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
});

export const ProjectSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  sector: z.string(),
  /** Lo arma el backend a partir del titulo; en el cliente solo se lee. */
  slug: z.string(),
  images: z.array(z.string()),
  seo: ProjectSEOSchema,
});

export type TProject = z.infer<typeof ProjectSchema>;
