import { z } from "zod";
import { DashboardPeriodSchema } from "@/schemas/enums.schemas";

const LabelValueSchema = z.object({
  labels: z.array(z.string()),
  data: z.array(z.number()),
});

/** `off` = la fuente aun no tiene credenciales; `error` = fallo la peticion. */
const SourceStatusSchema = z.enum(["ok", "error", "off"]);

export const DashboardSchema = z.object({
  period: DashboardPeriodSchema,
  periodLabel: z.string(),
  partial: z.boolean(),
  sources: z.object({
    ga: SourceStatusSchema,
    searchConsole: SourceStatusSchema,
    posthog: SourceStatusSchema,
  }),
  kpis: z.object({
    sessions: z.number(),
    users: z.number(),
    newUsers: z.number(),
    bounceRate: z.number(),
    avgSessionDuration: z.number(),
    pageViews: z.number(),
    conversions: z.number(),
    conversionRate: z.number(),
  }),
  sessionsSeries: z.object({
    labels: z.array(z.string()),
    sessions: z.array(z.number()),
    users: z.array(z.number()),
  }),
  conversionsSeries: z.object({
    labels: z.array(z.string()),
    whatsapp: z.array(z.number()),
    phone: z.array(z.number()),
    email: z.array(z.number()),
  }),
  devices: LabelValueSchema,
  newVsReturning: LabelValueSchema,
  peakHours: LabelValueSchema,
  topPages: z.array(z.object({ url: z.string(), views: z.number() })),
  sectionEngagement: z.array(z.object({ section: z.string(), seconds: z.number() })),
  trafficSources: z.object({
    sources: z.record(z.string(), z.object({
      totalVisits: z.number(),
      pages: z.array(z.object({ url: z.string(), visits: z.number() })),
    })),
    totalSessions: z.number(),
  }),
  topSearchTerms: z.array(z.object({ term: z.string(), count: z.number() })),
  topEvents: z.array(z.object({ event: z.string(), count: z.number() })),
  funnel: z.array(z.object({ step: z.string(), count: z.number() })),
  blog: z.object({
    series: z.object({ labels: z.array(z.string()), views: z.array(z.number()) }),
    top: z.array(z.object({ title: z.string(), path: z.string(), views: z.number() })),
    sources: LabelValueSchema,
  }),
});

export type TDashboard = z.infer<typeof DashboardSchema>;
export type TLabelValue = z.infer<typeof LabelValueSchema>;

export const DashboardResponseSchema = z.object({
  status: z.literal("success"),
  dashboard: DashboardSchema,
});

export const RealtimeResponseSchema = z.object({
  status: z.literal("success"),
  activeUsers: z.number().nullable(),
});
