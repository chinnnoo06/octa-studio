import z from "zod";
import { TestimonialSchema, TTestiomonial } from "@/schemas/testimonials/testimonials.schemas";
import { originHeader } from "../api.headers";

export const getTestimonialsService = async (): Promise<TTestiomonial[]> => {
  const url = `${process.env.API_URL}/testimonials`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
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

export const getTestimonialService = async (id: string): Promise<TTestiomonial> => {
  const url = `${process.env.API_URL}/testimonials/${id}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
  });

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
