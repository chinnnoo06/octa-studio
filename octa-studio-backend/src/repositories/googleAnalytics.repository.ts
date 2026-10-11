import { GA_PROPERTY_ID } from "../config/env";
import { getGoogleClient } from "../config/google";
import { alignToBuckets, gaKey } from "../utils/periods";
import { TBuckets, TGAData, TLabelValue, TPeriodConfig, TTrafficSource } from "../types/analytics/analytics.types";

const API = "https://analyticsdata.googleapis.com/v1beta";

const TIMEOUT = 25000;

type TGARow = { dimensionValues?: { value: string }[], metricValues?: { value: string }[] };
type TGAReport = { rows?: TGARow[] };

const dim = (row: TGARow, i = 0) => row.dimensionValues?.[i]?.value ?? "";
const metric = (row: TGARow, i = 0) => Number(row.metricValues?.[i]?.value ?? 0);
const rowsOf = (report?: TGAReport) => report?.rows ?? [];

/** Filtro de GA4: la dimension empieza por `value`. */
const beginsWith = (fieldName: string, value: string) => ({
    filter: { fieldName, stringFilter: { matchType: "BEGINS_WITH", value } }
});

const emptyGA = (status: TGAData["status"], buckets: TBuckets): TGAData => {
    const zeros = buckets.keys.map(() => 0);
    const empty = { labels: [], data: [] };

    return {
        status,
        kpis: { sessions: 0, users: 0, newUsers: 0, bounceRate: 0, avgSessionDuration: 0, pageViews: 0 },
        series: { sessions: zeros, users: zeros },
        devices: empty,
        topPages: [],
        sectionEngagement: [],
        trafficSources: { sources: {}, totalSessions: 0 },
        newVsReturning: empty,
        peakHours: empty,
        blog: { views: zeros, top: [], sources: empty }
    };
};

// ---------------------------------------------------------------------------
//  Parsers (uno por reporte, igual que en el dashboard de DILAE)
// ---------------------------------------------------------------------------

const parseTotals = (report?: TGAReport): TGAData["kpis"] => {
    const [row] = rowsOf(report);

    if (!row) return { sessions: 0, users: 0, newUsers: 0, bounceRate: 0, avgSessionDuration: 0, pageViews: 0 };

    return {
        sessions: metric(row, 0),
        users: metric(row, 1),
        newUsers: metric(row, 2),
        bounceRate: Math.round(metric(row, 3) * 1000) / 10,
        avgSessionDuration: Math.round(metric(row, 4)),
        pageViews: metric(row, 5)
    };
};

const parseSeries = (report: TGAReport | undefined, buckets: TBuckets, gran: TPeriodConfig["gran"]) => {
    const sessions = new Map<string, number>();
    const users = new Map<string, number>();

    rowsOf(report).forEach(row => {
        const key = gaKey(dim(row), gran);
        sessions.set(key, metric(row, 0));
        users.set(key, metric(row, 1));
    });

    return { sessions: alignToBuckets(sessions, buckets), users: alignToBuckets(users, buckets) };
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const parseLabelValue = (report?: TGAReport, upperFirst = false): TLabelValue => {
    const rows = rowsOf(report);

    return {
        labels: rows.map(row => upperFirst ? capitalize(dim(row)) : dim(row)),
        data: rows.map(row => metric(row))
    };
};

const parsePages = (report?: TGAReport) =>
    rowsOf(report).map(row => ({ url: dim(row), views: metric(row) }));

/** Agrupa las rutas del sitio en las secciones de Octa. */
const sectionOf = (path: string) => {
    const clean = path.split("?")[0];

    if (clean === "/" || clean === "") return "Inicio";
    if (clean.startsWith("/servicios")) return "Servicios";
    if (clean.startsWith("/proyectos")) return "Proyectos";
    if (clean.startsWith("/blogs")) return "Blog";
    if (clean.startsWith("/nosotros")) return "Nosotros";
    if (clean.startsWith("/contacto")) return "Contacto";
    return "Otras";
};

const parseSections = (report?: TGAReport) => {
    const seconds = new Map<string, number>();

    rowsOf(report).forEach(row => {
        const section = sectionOf(dim(row));
        seconds.set(section, (seconds.get(section) ?? 0) + metric(row));
    });

    return [...seconds.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([section, total]) => ({ section, seconds: total }));
};

const NEW_VS_RETURNING: Record<string, string> = { new: "Nuevos", returning: "Recurrentes" };

const parseNewVsReturning = (report?: TGAReport): TLabelValue => {
    const rows = rowsOf(report).filter(row => NEW_VS_RETURNING[dim(row)]);

    return {
        labels: rows.map(row => NEW_VS_RETURNING[dim(row)]),
        data: rows.map(row => metric(row))
    };
};

const parsePeakHours = (report?: TGAReport): TLabelValue => {
    const hours = Array.from({ length: 24 }, () => 0);

    rowsOf(report).forEach(row => {
        const hour = Number(dim(row));
        if (hour >= 0 && hour < 24) hours[hour] = metric(row);
    });

    return {
        labels: hours.map((_, h) => `${String(h).padStart(2, "0")}:00`),
        data: hours
    };
};

const parseTraffic = (report?: TGAReport): TGAData["trafficSources"] => {
    const grouped: Record<string, TTrafficSource> = {};
    let totalSessions = 0;

    rowsOf(report).forEach(row => {
        const source = dim(row, 0);
        const visits = metric(row);

        totalSessions += visits;
        grouped[source] ??= { totalVisits: 0, pages: [] };
        grouped[source].totalVisits += visits;
        grouped[source].pages.push({ url: dim(row, 1), visits });
    });

    // Mismo orden que el acordeon: la fuente con mas sesiones primero.
    const sources = Object.fromEntries(
        Object.entries(grouped).sort((a, b) => b[1].totalVisits - a[1].totalVisits)
    );

    return { sources, totalSessions };
};

const parseBlogViews = (report: TGAReport | undefined, buckets: TBuckets, gran: TPeriodConfig["gran"]) => {
    const views = new Map<string, number>();

    rowsOf(report).forEach(row => views.set(gaKey(dim(row), gran), metric(row)));

    return alignToBuckets(views, buckets);
};

const parseBlogTop = (report?: TGAReport) =>
    rowsOf(report).map(row => {
        const path = dim(row, 1);
        // Sin el sufijo de la plantilla de titulo, para que la lista se lea limpia.
        const title = dim(row, 0).replace(/\s*\|\s*Octa Building Studio.*$/i, "").trim();

        return { title: title || path, path, views: metric(row) };
    });

// ---------------------------------------------------------------------------
//  Peticiones
// ---------------------------------------------------------------------------

const batchRunReports = async (requests: object[]) => {
    const client = getGoogleClient()!;

    const res = await client.request<{ reports?: TGAReport[] }>({
        url: `${API}/properties/${GA_PROPERTY_ID}:batchRunReports`,
        method: "POST",
        data: { requests },
        timeout: TIMEOUT
    });

    return res.data.reports ?? [];
};

export const googleAnalyticsRepository = {

    isConfigured() {
        return Boolean(GA_PROPERTY_ID && getGoogleClient());
    },

    async getData(cfg: TPeriodConfig, buckets: TBuckets): Promise<TGAData> {
        if (!this.isConfigured()) return emptyGA("off", buckets);

        const dateRanges = [{ startDate: cfg.start, endDate: cfg.end }];

        // GA4 acepta hasta 5 reportes por lote: tres lotes, en paralelo.
        const batch1 = [
            {
                dateRanges,
                dimensions: [{ name: cfg.gaDim }],
                metrics: [{ name: "sessions" }, { name: "totalUsers" }],
                orderBys: [{ dimension: { dimensionName: cfg.gaDim } }],
                limit: 1000
            },
            {
                dateRanges,
                metrics: [
                    { name: "sessions" }, { name: "totalUsers" }, { name: "newUsers" },
                    { name: "bounceRate" }, { name: "averageSessionDuration" }, { name: "screenPageViews" }
                ]
            },
            {
                dateRanges,
                dimensions: [{ name: "deviceCategory" }],
                metrics: [{ name: "sessions" }]
            },
            {
                dateRanges,
                dimensions: [{ name: "pagePath" }],
                metrics: [{ name: "screenPageViews" }],
                orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
                limit: 8
            },
            {
                dateRanges,
                dimensions: [{ name: "pagePath" }],
                metrics: [{ name: "userEngagementDuration" }],
                limit: 1000
            }
        ];

        const batch2 = [
            {
                dateRanges,
                dimensions: [{ name: "sessionDefaultChannelGroup" }, { name: "landingPagePlusQueryString" }],
                metrics: [{ name: "sessions" }],
                orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
                limit: 50
            },
            {
                dateRanges,
                dimensions: [{ name: "newVsReturning" }],
                metrics: [{ name: "activeUsers" }]
            },
            {
                dateRanges,
                dimensions: [{ name: "hour" }],
                metrics: [{ name: "sessions" }],
                orderBys: [{ dimension: { dimensionName: "hour" } }]
            }
        ];

        // Blog: /blogs (listado y categorias) y /blogs/<slug> (articulos).
        const batch3 = [
            {
                dateRanges,
                dimensions: [{ name: cfg.gaDim }],
                metrics: [{ name: "screenPageViews" }],
                dimensionFilter: beginsWith("pagePath", "/blogs"),
                orderBys: [{ dimension: { dimensionName: cfg.gaDim } }],
                limit: 1000
            },
            {
                dateRanges,
                dimensions: [{ name: "pageTitle" }, { name: "pagePath" }],
                metrics: [{ name: "screenPageViews" }],
                dimensionFilter: beginsWith("pagePath", "/blogs/"),
                orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
                limit: 8
            },
            {
                dateRanges,
                dimensions: [{ name: "sessionDefaultChannelGroup" }],
                metrics: [{ name: "sessions" }],
                dimensionFilter: beginsWith("landingPagePlusQueryString", "/blogs"),
                orderBys: [{ metric: { metricName: "sessions" }, desc: true }]
            }
        ];

        try {
            const [r1, r2, r3] = await Promise.all([
                batchRunReports(batch1),
                batchRunReports(batch2),
                batchRunReports(batch3)
            ]);

            return {
                status: "ok",
                kpis: parseTotals(r1[1]),
                series: parseSeries(r1[0], buckets, cfg.gran),
                devices: parseLabelValue(r1[2], true),
                topPages: parsePages(r1[3]),
                sectionEngagement: parseSections(r1[4]),
                trafficSources: parseTraffic(r2[0]),
                newVsReturning: parseNewVsReturning(r2[1]),
                peakHours: parsePeakHours(r2[2]),
                blog: {
                    views: parseBlogViews(r3[0], buckets, cfg.gran),
                    top: parseBlogTop(r3[1]),
                    sources: parseLabelValue(r3[2])
                }
            };
        } catch (error) {
            console.error("Google Analytics API error:", error instanceof Error ? error.message : error);
            return emptyGA("error", buckets);
        }
    },

    /** Usuarios activos en los ultimos 30 minutos; `null` si GA no esta disponible. */
    async getRealtimeUsers(): Promise<number | null> {
        if (!this.isConfigured()) return null;

        try {
            const res = await getGoogleClient()!.request<{ rows?: TGARow[] }>({
                url: `${API}/properties/${GA_PROPERTY_ID}:runRealtimeReport`,
                method: "POST",
                data: { metrics: [{ name: "activeUsers" }] },
                timeout: 10000
            });

            const [row] = res.data.rows ?? [];

            return row ? metric(row) : 0;
        } catch (error) {
            console.error("Google Analytics realtime error:", error instanceof Error ? error.message : error);
            return null;
        }
    }
};
