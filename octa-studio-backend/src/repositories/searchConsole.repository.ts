import { GSC_SITE_URL } from "../config/env";
import { getGoogleClient } from "../config/google";
import { TPeriodConfig, TSearchConsoleData } from "../types/analytics/analytics.types";

const API = "https://www.googleapis.com/webmasters/v3";

const TOP_QUERIES = 8;

type TSearchRow = { keys?: string[], clicks?: number, impressions?: number };

export const searchConsoleRepository = {

    isConfigured() {
        return Boolean(GSC_SITE_URL && getGoogleClient());
    },

    /**
     * Busquedas de Google que mas clics trajeron en el periodo. Search Console
     * publica los datos con 2-3 dias de retraso: "Hoy" casi siempre sale vacio.
     */
    async getData(cfg: TPeriodConfig): Promise<TSearchConsoleData> {
        if (!this.isConfigured()) return { status: "off", topQueries: [] };

        try {
            const res = await getGoogleClient()!.request<{ rows?: TSearchRow[] }>({
                url: `${API}/sites/${encodeURIComponent(GSC_SITE_URL)}/searchAnalytics/query`,
                method: "POST",
                data: {
                    startDate: cfg.start,
                    endDate: cfg.end,
                    dimensions: ["query"],
                    rowLimit: TOP_QUERIES
                },
                timeout: 20000
            });

            const topQueries = (res.data.rows ?? [])
                .map(row => ({ term: row.keys?.[0] ?? "", count: Math.round(row.clicks ?? 0) }))
                .filter(row => row.term && row.count > 0);

            return { status: "ok", topQueries };
        } catch (error) {
            console.error("Search Console API error:", error instanceof Error ? error.message : error);
            return { status: "error", topQueries: [] };
        }
    }
};
