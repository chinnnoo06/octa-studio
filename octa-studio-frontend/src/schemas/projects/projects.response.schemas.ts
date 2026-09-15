import { z } from "zod";
import { PaginationSchema } from "../common/common.response.schemas";
import { ProjectSchema } from "./projects.schemas";

export const ProjectsResponseSchema = z.object({
  status: z.literal("success"),
  projects: z.array(ProjectSchema),
  pagination: PaginationSchema,
});

export const ProjectResponseSchema = z.object({
  status: z.literal("success"),
  project: ProjectSchema,
});

export type TProjectsResponse = z.infer<typeof ProjectsResponseSchema>;
