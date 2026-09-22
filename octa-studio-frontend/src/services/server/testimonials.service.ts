import z from "zod";
import { TestimonialSchema, TTestiomonial } from "@/schemas/testimonials/testimonials.schemas";
import { originHeader } from "../api.headers";
import { getToken } from "../auth/auth.token";

export const getTestimonialsService = async (): Promise<TTestiomonial[]> => {
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

export const getTestimonialService = async (id: string): Promise<TTestiomonial | null> => {
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
