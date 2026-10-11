import { z } from "zod";
import { PaginationSchema } from "../common/common.response.schemas";
import { ProjectSchema } from "./project.schemas";

export const ProjectsResponseSchema = z.object({
  status: z.literal("success"),
  projects: z.array(ProjectSchema),
  pagination: PaginationSchema,
});

export type TProjectsResponse = z.infer<typeof ProjectsResponseSchema>;
