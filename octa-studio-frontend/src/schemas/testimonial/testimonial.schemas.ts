import { z } from "zod";
import { PaginationSchema } from "../common/common.response.schemas";

export const TestimonialSchema = z.object({
  _id: z.string(),
  quote: z.string(),
  name: z.string(),
  rating: z.number().min(0).max(5),
  image: z.string(),
  createdAt: z.string().optional(),
});

export type TTestimonial = z.infer<typeof TestimonialSchema>;

export const AdminTestimonialsResponseSchema = z.object({
  status: z.literal("success"),
  testimonials: z.array(TestimonialSchema),
  pagination: PaginationSchema,
});
