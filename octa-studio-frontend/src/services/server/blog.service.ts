import { BlogsResponseSchema, BlogStatsResponseSchema, RelatedBlogsResponseSchema } from "@/schemas/blog/blog.response.schemas";
import { TAdminListParams } from "@/types/common.types";
import { toQueryString } from "@/utils/admin/queryString";
import { BlogSchema } from "@/schemas/blog/blog.schemas";
import { originHeader } from "../api.headers";
import { getToken } from "../auth/auth.token";

export const getBlogsService = async (page: number = 1, category?: string) => {
  const params = new URLSearchParams({ page: String(page) });
  if (category) params.set("category", category);

  const url = `${process.env.API_URL}/blogs?${params}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    next: { revalidate: 3600, tags: ["blogs"] },
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();
  const result = BlogsResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /blogs");
  }

  return {
    blogs: result.data.blogs,
    pagination: result.data.pagination,
  };
};

export const getBlogByIdService = async (id: string) => {
  const token = await getToken();

  const url = `${process.env.API_URL}/blogs/id/${id}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...originHeader()
    },
    cache: "no-store",
  });

  // Id inexistente (404) o mal formado (400): la pagina responde 404.
  if (req.status === 404 || req.status === 400) {
    return null;
  }

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = BlogSchema.safeParse(json.blog);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /blogs/id/:id");
  }

  return result.data;
};

export const getBlogBySlugService = async (slug: string) => {
  const url = `${process.env.API_URL}/blogs/${slug}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    next: { revalidate: 3600, tags: ["blogs"] },
  });

  // Slug inexistente (404) o rechazado por el backend (400): la pagina responde 404.
  if (req.status === 404 || req.status === 400) {
    return null;
  }

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = BlogSchema.safeParse(json.blog);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /blogs/:slug");
  }

  return result.data;
};

/**
 * Entradas sugeridas al final del articulo; el backend ya las elige (misma
 * categoria primero). Son secundarias: si fallan, la ficha sale sin ellas.
 */
export const getRelatedBlogsService = async (slug: string) => {
  const url = `${process.env.API_URL}/blogs/${slug}/related`;

  try {
    const req = await fetch(url, {
      method: "GET",
      headers: {
        ...originHeader()
      },
      next: { revalidate: 3600, tags: ["blogs"] },
    });

    if (!req.ok) return [];

    const result = RelatedBlogsResponseSchema.safeParse(await req.json());

    return result.success ? result.data.blogs : [];
  } catch {
    return [];
  }
};

/** Listado del panel: incluye borradores y acepta buscador, filtros y orden. */
export const getAdminBlogsService = async (params: TAdminListParams) => {
  const token = await getToken();

  const url = `${process.env.API_URL}/blogs/admin?${toQueryString(params)}`;

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
  const result = BlogsResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /blogs/admin");
  }

  return {
    blogs: result.data.blogs,
    pagination: result.data.pagination,
  };
};

/** Bloque "Blog" del dashboard. `null` si el backend no responde: el resto del panel sigue. */
export const getBlogStatsService = async () => {
  const token = await getToken();

  const url = `${process.env.API_URL}/blogs/stats`;

  try {
    const req = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...originHeader()
      },
      cache: "no-store",
    });

    if (!req.ok) return null;

    const result = BlogStatsResponseSchema.safeParse(await req.json());

    return result.success ? result.data.stats : null;
  } catch {
    return null;
  }
};
