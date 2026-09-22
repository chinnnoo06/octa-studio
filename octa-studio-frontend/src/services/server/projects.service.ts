import { ProjectResponseSchema, ProjectsResponseSchema } from "@/schemas/projects/projects.response.schemas";
import { originHeader } from "../api.headers";
import { getToken } from "../auth/auth.token";

export const getProjectsService = async (page: number = 1) => {
  const url = `${process.env.API_URL}/projects?page=${page}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    next: { revalidate: 3600, tags: ["projects"] },
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
  const token = await getToken();

  const url = `${process.env.API_URL}/projects/id/${id}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...originHeader()
    },
    cache: "no-store",
  });

  if (req.status === 404 || req.status === 400) {
    return null;
  }

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
    next: { revalidate: 3600, tags: ["projects"] },
  });

  // Slug inexistente (404) o rechazado por el backend (400): la pagina responde 404.
  if (req.status === 404 || req.status === 400) {
    return null;
  }

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
