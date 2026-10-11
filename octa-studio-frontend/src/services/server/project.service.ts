import { AdminProjectsResponseSchema, ProjectsCountResponseSchema, ProjectsResponseSchema } from "@/schemas/project/project.response.schemas";
import { TAdminListParams } from "@/types/common.types";
import { toQueryString } from "@/utils/queryString";
import { originHeader } from "../api.headers";
import { getToken } from "../auth/auth.token";
import { ProjectSchema } from "@/schemas/project/project.schemas";

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

  const result = ProjectSchema.safeParse(json.project);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /projects/id/:id");
  }

  return result.data;
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

  if (req.status === 404 || req.status === 400) {
    return null;
  }

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = ProjectSchema.safeParse(json.project);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /projects/:slug");
  }

  return result.data;
};

/** Listado del panel: buscador, filtros y orden; trae tambien los sectores existentes. */
export const getAdminProjectsService = async (params: TAdminListParams) => {
  const token = await getToken();

  const url = `${process.env.API_URL}/projects/admin?${toQueryString(params)}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...originHeader()
    },
    cache: "no-store",
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();
  const result = AdminProjectsResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /projects/admin");
  }

  return result.data;
};

/** Total de proyectos para las acciones rapidas del dashboard; `null` si falla. */
export const getProjectsCountService = async () => {
  const token = await getToken();

  try {
    const req = await fetch(`${process.env.API_URL}/projects/count`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...originHeader()
      },
      cache: "no-store",
    });

    if (!req.ok) return null;

    const result = ProjectsCountResponseSchema.safeParse(await req.json());

    return result.success ? result.data.total : null;
  } catch {
    return null;
  }
};
