import z from "zod";
import { AdminTestimonialsResponseSchema, TestimonialSchema, TTestimonial } from "@/schemas/testimonial/testimonial.schemas";
import { TAdminListParams } from "@/types/common.types";
import { toQueryString } from "@/utils/admin/queryString";
import { originHeader } from "../api.headers";
import { getToken } from "../auth/auth.token";

export const getTestimonialsService = async (): Promise<TTestimonial[]> => {
  const url = `${process.env.API_URL}/testimonials`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    next: { revalidate: 3600, tags: ["testimonials"] },
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = z.array(TestimonialSchema).safeParse(json.testimonials);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /testimonials");
  }

  return result.data;
};

export const getTestimonialService = async (id: string): Promise<TTestimonial | null> => {
  const token = await getToken();

  const url = `${process.env.API_URL}/testimonials/${id}`;

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

  const result = TestimonialSchema.safeParse(json.testimonial);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /testimonias/:id");
  }

  return result.data;
};

/** Listado del panel: buscador, filtro por valoracion y fechas, orden y paginas. */
export const getAdminTestimonialsService = async (params: TAdminListParams) => {
  const token = await getToken();

  const url = `${process.env.API_URL}/testimonials/admin?${toQueryString(params)}`;

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
  const result = AdminTestimonialsResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /testimonials/admin");
  }

  return {
    testimonials: result.data.testimonials,
    pagination: result.data.pagination,
  };
};
