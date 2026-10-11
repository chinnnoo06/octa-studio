import { DashboardResponseSchema, RealtimeResponseSchema } from "@/schemas/analytics/analytics.schemas";
import { TDashboardPeriod } from "@/schemas/enums.schemas";
import { originHeader } from "../api.headers";
import { getToken } from "../auth/auth.token";

/**
 * Metricas del dashboard (GA4 + Search Console + PostHog). El backend ya cachea
 * por periodo, asi que aqui va en `no-store` como todo fetch con token.
 */
export const getDashboardService = async (period: TDashboardPeriod) => {
  const token = await getToken();

  const url = `${process.env.API_URL}/analytics/dashboard?period=${period}`;

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
  const result = DashboardResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /analytics/dashboard");
  }

  return result.data.dashboard;
};

/** Usuarios activos ahora mismo; `null` si GA no esta conectado o fallo. */
export const getRealtimeUsersService = async () => {
  const token = await getToken();

  const req = await fetch(`${process.env.API_URL}/analytics/realtime`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...originHeader()
    },
    cache: "no-store",
  });

  if (!req.ok) return null;

  const result = RealtimeResponseSchema.safeParse(await req.json());

  return result.success ? result.data.activeUsers : null;
};
