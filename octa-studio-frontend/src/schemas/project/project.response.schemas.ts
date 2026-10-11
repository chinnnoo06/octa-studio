import { z } from "zod";
import { PaginationSchema } from "../common/common.response.schemas";
import { ProjectSchema } from "./project.schemas";

export const ProjectsResponseSchema = z.object({
  status: z.literal("success"),
  projects: z.array(ProjectSchema),
  pagination: PaginationSchema,
});

export type TProjectsResponse = z.infer<typeof ProjectsResponseSchema>;

/** Listado del panel: trae ademas los sectores existentes para el filtro. */
export const AdminProjectsResponseSchema = ProjectsResponseSchema.extend({
  sectors: z.array(z.string()),
});

export const ProjectsCountResponseSchema = z.object({
  status: z.literal("success"),
  total: z.number(),
});
