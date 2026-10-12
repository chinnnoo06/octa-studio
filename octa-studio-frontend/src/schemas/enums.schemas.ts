import { z } from "zod"
import { BLOG_STATUSES } from "@/utils/data/blogs"

export const BlogStatusSchema = z.enum(BLOG_STATUSES, { error: "Elige un estado" })
export type TBlogStatus = z.infer<typeof BlogStatusSchema>

/** Periodos del selector del dashboard; el backend usa las mismas claves. */
export const DASHBOARD_PERIODS = ["hoy", "mes", "7dias", "30dias", "6meses", "12meses", "todo"] as const

export const DashboardPeriodSchema = z.enum(DASHBOARD_PERIODS)
export type TDashboardPeriod = z.infer<typeof DashboardPeriodSchema>
