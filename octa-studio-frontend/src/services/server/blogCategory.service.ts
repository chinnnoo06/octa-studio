import { BlogCategoriesResponseSchema, BlogCategoryResponseSchema } from "@/schemas/blogCategory/blogCategory.response.schemas";
import { TBlogCategory } from "@/schemas/blogCategory/blogCategory.schemas";
import { originHeader } from "../api.headers";
import { getToken } from "../auth/auth.token";

/** Categorias ordenadas para el filtro publico y los selects del panel. */
export const getBlogCategoriesService = async (): Promise<TBlogCategory[]> => {
  const req = await fetch(`${process.env.API_URL}/blog-categories`, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    next: { revalidate: 3600, tags: ["blog-categories"] },
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const result = BlogCategoriesResponseSchema.safeParse(await req.json());

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /blog-categories");
  }

  return result.data.categories;
};

/** Listado del panel: con el numero de entradas de cada categoria. */
export const getAdminBlogCategoriesService = async (): Promise<TBlogCategory[]> => {
  const token = await getToken();

  const req = await fetch(`${process.env.API_URL}/blog-categories/admin`, {
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

  const result = BlogCategoriesResponseSchema.safeParse(await req.json());

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /blog-categories/admin");
  }

  return result.data.categories;
};

export const getBlogCategoryByIdService = async (id: string): Promise<TBlogCategory | null> => {
  const token = await getToken();

  const req = await fetch(`${process.env.API_URL}/blog-categories/${id}`, {
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

  const result = BlogCategoryResponseSchema.safeParse(await req.json());

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /blog-categories/:id");
  }

  return result.data.category;
};
