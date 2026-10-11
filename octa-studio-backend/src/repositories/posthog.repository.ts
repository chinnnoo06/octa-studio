import { ANALYTICS_TIMEZONE, POSTHOG_API_HOST, POSTHOG_PERSONAL_API_KEY, POSTHOG_PROJECT_ID } from "../config/env";
import { alignToBuckets, phKey } from "../utils/periods";
import { TBuckets, TConversionChannel, TPeriodConfig, TPostHogData } from "../types/analytics/analytics.types";

const TIMEOUT = 20000;

const CHANNELS: TConversionChannel[] = ["whatsapp", "phone", "email"];

const FUNNEL_STEPS = ["Visitaron el sitio", "Vieron proyectos o servicios", "Contactaron"];

/**
 * Conversiones medidas con el autocapture de PostHog: clic en un enlace de
 * WhatsApp, `tel:` o `mailto:` (el sitio no tiene formulario de contacto).
 * `elements_chain` guarda el href del enlace pulsado.
 */
const CONDITIONS: Record<TConversionChannel, string> = {
    whatsapp: "(properties.$event_type = 'click' AND (elements_chain LIKE '%wa.me%' OR elements_chain LIKE '%whatsapp.com%'))",
    phone: "(properties.$event_type = 'click' AND elements_chain LIKE '%tel:%')",
    email: "(properties.$event_type = 'click' AND elements_chain LIKE '%mailto:%')"
};

const ANY_CONVERSION = `event = '$autocapture' AND (${CHANNELS.map(c => CONDITIONS[c]).join(" OR ")})`;

const countColumns = CHANNELS
    .map(channel => `countIf(event = '$autocapture' AND ${CONDITIONS[channel]}) AS ${channel}`)
    .join(",\n");

type TRows = unknown[][];

/** Lanza todas las consultas HogQL en paralelo. `null` = fallo la peticion (distinto de [] = sin datos). */
const runQueries = async <K extends string>(queries: Record<K, string>) => {
    const url = `${POSTHOG_API_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`;

    const entries = await Promise.all(
        (Object.entries(queries) as [K, string][]).map(async ([key, query]) => {
            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
                    signal: AbortSignal.timeout(TIMEOUT)
                });

                if (!res.ok) {
                    console.error(`PostHog query "${key}" failed with ${res.status}`);
                    return [key, null] as const;
                }

                const json = await res.json() as { results?: TRows };

                return [key, json.results ?? []] as const;
            } catch (error) {
                console.error(`PostHog query "${key}" error:`, error instanceof Error ? error.message : error);
                return [key, null] as const;
            }
        })
    );

    return Object.fromEntries(entries) as Record<K, TRows | null>;
};

const emptyPostHog = (status: TPostHogData["status"], buckets: TBuckets): TPostHogData => {
    const zeros = buckets.keys.map(() => 0);

    return {
        status,
        totalConversions: 0,
        conversionsSeries: { whatsapp: zeros, phone: zeros, email: zeros },
        topEvents: [],
        funnel: FUNNEL_STEPS.map(step => ({ step, count: 0 }))
    };
};

export const posthogRepository = {

    isConfigured() {
        return Boolean(POSTHOG_PERSONAL_API_KEY && POSTHOG_PROJECT_ID);
    },

    async getData(cfg: TPeriodConfig, buckets: TBuckets): Promise<TPostHogData> {
        if (!this.isConfigured()) return emptyPostHog("off", buckets);

        // HogQL no acepta zona horaria como 2o argumento de las funciones de
        // fecha: primero se convierte el timestamp con toTimeZone().
        const tz = ANALYTICS_TIMEZONE;
        const local = `toTimeZone(timestamp, '${tz}')`;
        const from = `toDateTime('${cfg.start} 00:00:00', '${tz}')`;
        const to = `toDateTime('${cfg.end} 23:59:59', '${tz}')`;
        const range = `timestamp >= ${from} AND timestamp <= ${to}`;

        const bucket = cfg.gran === "hour"
            ? `toStartOfHour(${local})`
            : cfg.gran === "day" ? `toDate(${local})` : `toStartOfMonth(${local})`;

        const results = await runQueries({
            counts: `
                SELECT ${countColumns}
                FROM events
                WHERE event = '$autocapture' AND ${range}`,

            series: `
                SELECT ${bucket} AS bucket, ${countColumns}
                FROM events
                WHERE event = '$autocapture' AND ${range}
                GROUP BY bucket ORDER BY bucket ASC`,

            clicks: `
                SELECT properties.$el_text, count() AS total
                FROM events
                WHERE event = '$autocapture'
                  AND properties.$event_type = 'click'
                  AND properties.$el_text != '' AND isNotNull(properties.$el_text)
                  AND ${range}
                GROUP BY properties.$el_text ORDER BY total DESC LIMIT 8`,

            funnel: `
                SELECT
                    count(DISTINCT person_id) AS visitors,
                    count(DISTINCT if(event = '$pageview' AND (properties.$pathname LIKE '/proyectos%' OR properties.$pathname LIKE '/servicios%'), person_id, NULL)) AS viewers,
                    count(DISTINCT if(${ANY_CONVERSION}, person_id, NULL)) AS converters
                FROM events
                WHERE ${range}`
        });

        // `counts` es un agregado sin GROUP BY: si la peticion salio bien siempre trae una fila.
        if (!results.counts?.length) return emptyPostHog("error", buckets);

        const [countsRow] = results.counts;
        const totalConversions = CHANNELS.reduce((sum, _, i) => sum + Number(countsRow[i] ?? 0), 0);

        const maps = Object.fromEntries(CHANNELS.map(c => [c, new Map<string, number>()])) as Record<TConversionChannel, Map<string, number>>;

        (results.series ?? []).forEach(row => {
            const key = phKey(String(row[0] ?? ""), cfg.gran);
            CHANNELS.forEach((channel, i) => maps[channel].set(key, Number(row[i + 1] ?? 0)));
        });

        const conversionsSeries = Object.fromEntries(
            CHANNELS.map(channel => [channel, alignToBuckets(maps[channel], buckets)])
        ) as Record<TConversionChannel, number[]>;

        const topEvents = (results.clicks ?? []).map(row => {
            const text = String(row[0] ?? "").trim();
            return { event: text.length > 32 ? `${text.slice(0, 30)}…` : text, count: Number(row[1] ?? 0) };
        });

        const [funnelRow = []] = results.funnel ?? [];

        return {
            status: "ok",
            totalConversions,
            conversionsSeries,
            topEvents,
            funnel: FUNNEL_STEPS.map((step, i) => ({ step, count: Number(funnelRow[i] ?? 0) }))
        };
    }
};
