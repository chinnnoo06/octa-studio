import { googleAnalyticsRepository } from "../repositories/googleAnalytics.repository";
import { searchConsoleRepository } from "../repositories/searchConsole.repository";
import { posthogRepository } from "../repositories/posthog.repository";
import { buildBuckets, normalizePeriod, periodConfig } from "../utils/periods";
import { TPeriod } from "../types/analytics/analytics.types";

/** "Hoy" cambia durante el dia: cache corta. Los periodos historicos, una hora. */
const TTL_TODAY = 10 * 60 * 1000;
const TTL_DEFAULT = 60 * 60 * 1000;

type TDashboard = Awaited<ReturnType<typeof buildDashboard>>;

const cache = new Map<TPeriod, { data: TDashboard, at: number }>();

const buildDashboard = async (period: TPeriod) => {
    const cfg = periodConfig(period);
    const buckets = buildBuckets(cfg.start, cfg.end, cfg.gran);

    const [firstGa, gsc, ph] = await Promise.all([
        googleAnalyticsRepository.getData(cfg, buckets),
        searchConsoleRepository.getData(cfg),
        posthogRepository.getData(cfg, buckets)
    ]);

    // Un reintento ante fallo transitorio de GA (cuota o red).
    const ga = firstGa.status === "error"
        ? await new Promise(resolve => setTimeout(resolve, 500)).then(() => googleAnalyticsRepository.getData(cfg, buckets))
        : firstGa;

    const sessions = ga.kpis.sessions;
    const conversions = ph.totalConversions;

    const sources = { ga: ga.status, searchConsole: gsc.status, posthog: ph.status };

    return {
        period,
        periodLabel: cfg.label,
        // Parcial = alguna fuente configurada fallo. Las que aun no se conectan no cuentan.
        partial: Object.values(sources).includes("error"),
        sources,
        kpis: {
            ...ga.kpis,
            conversions,
            conversionRate: sessions > 0 ? Math.round((conversions / sessions) * 10000) / 100 : 0
        },
        sessionsSeries: {
            labels: buckets.labels,
            sessions: ga.series.sessions,
            users: ga.series.users
        },
        conversionsSeries: {
            labels: buckets.labels,
            ...ph.conversionsSeries
        },
        devices: ga.devices,
        newVsReturning: ga.newVsReturning,
        peakHours: ga.peakHours,
        topPages: ga.topPages,
        sectionEngagement: ga.sectionEngagement,
        trafficSources: ga.trafficSources,
        topSearchTerms: gsc.topQueries,
        topEvents: ph.topEvents,
        funnel: ph.funnel,
        blog: {
            series: { labels: buckets.labels, views: ga.blog.views },
            top: ga.blog.top,
            sources: ga.blog.sources
        }
    };
};

export const AnalyticsService = {

    async getDashboard(rawPeriod?: string) {
        const period = normalizePeriod(rawPeriod);
        const ttl = period === "hoy" ? TTL_TODAY : TTL_DEFAULT;

        const cached = cache.get(period);

        if (cached && Date.now() - cached.at < ttl) return cached.data;

        const data = await buildDashboard(period);

        // Solo se cachea si ninguna fuente fallo; asi un error transitorio no
        // deja el dashboard vacio durante una hora.
        if (!data.partial) cache.set(period, { data, at: Date.now() });

        return data;
    },

    async getRealtimeUsers() {
        return googleAnalyticsRepository.getRealtimeUsers();
    }
};
