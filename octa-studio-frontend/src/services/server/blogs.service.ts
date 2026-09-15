import { BlogResponseSchema, BlogsResponseSchema } from "@/schemas/blogs/blogs.response.schemas";
import { originHeader } from "../api.headers";

export const getBlogsService = async (page: number = 1) => {
  const url = `${process.env.API_URL}/blogs?page=${page}`;

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

  // Se valida la respuesta entera y no solo la lista: la paginacion se usa para
  // pintar los controles, asi que un `totalPages` ausente romperia igual.
  const result = BlogsResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /blogs");
  }

  return {
    blogs: result.data.blogs,
    pagination: result.data.pagination,
  };
};

/**
 * Por id. Es la que usa el panel: ahi todo se referencia por id, incluidos los
 * enlaces de editar y borrar.
 */
export const getBlogByIdService = async (id: string) => {
  const url = `${process.env.API_URL}/blogs/id/${id}`;

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

  const result = BlogResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /blogs/id/:id");
  }

  return result.data.blog;
};

/**
 * Por slug. Es la del sitio publico, donde la URL la forma el titulo. Todavia
 * no se usa, pero la ruta del backend ya existe y conviene que el frontend
 * refleje las dos formas de buscar un blog.
 */
export const getBlogBySlugService = async (slug: string) => {
  const url = `${process.env.API_URL}/blogs/${slug}`;

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

  const result = BlogResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /blogs/:slug");
  }

  return result.data.blog;
};
