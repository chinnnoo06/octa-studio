import { BlogResponseSchema, BlogsResponseSchema } from "@/schemas/blogs/blogs.response.schemas";
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

  const result = BlogResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /blogs/id/:id");
  }

  return result.data.blog;
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

  const result = BlogResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /blogs/:slug");
  }

  return result.data.blog;
};
