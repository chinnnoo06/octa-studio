import z from "zod";

export const SuccessLoginResponseSchema = z.object({
  status: z.literal("success"),
  token: z.string()
})