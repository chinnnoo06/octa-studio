import { z } from "zod";

export const TestimonialSchema = z.object({
  _id: z.string(),
  quote: z.string(),
  name: z.string(),
  rating: z.number().min(0).max(5),
  image: z.string(),
});

export type TTestiomonial = z.infer<typeof TestimonialSchema>;
