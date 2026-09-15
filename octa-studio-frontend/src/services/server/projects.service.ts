import { ProjectResponseSchema, ProjectsResponseSchema } from "@/schemas/projects/projects.response.schemas";
import { originHeader } from "../api.headers";

export const getProjectsService = async (page: number = 1) => {
  const url = `${process.env.API_URL}/projects?page=${page}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    cache: "no-store",
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = ProjectsResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /projects");
  }

  return {
    projects: result.data.projects,
    pagination: result.data.pagination,
  };
};

export const getProjectByIdService = async (id: string) => {
  const url = `${process.env.API_URL}/projects/id/${id}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    cache: "no-store",
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = ProjectResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /projects/id/:id");
  }

  return result.data.project;
};

export const getProjectBySlugService = async (slug: string) => {
  const url = `${process.env.API_URL}/projects/${slug}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    cache: "no-store",
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = ProjectResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /projects/:slug");
  }

  return result.data.project;
};
