import z from "zod";

export const SuccessResponseSchema = z.object({
  message: z.string()
})

export const ErrorResponseSchema = z.object({
  message: z.string().optional()
})

/** Forma que devuelve el backend en cualquier listado paginado: la comparten
 *  proyectos y blogs, que usan el mismo `mongoose-paginate`. */
export const PaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
})

export type TPagination = z.infer<typeof PaginationSchema>
