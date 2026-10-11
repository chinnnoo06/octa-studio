import { ANALYTICS_TIMEZONE } from "../config/env";
import { TBuckets, TGranularity, TPeriod, TPeriodConfig } from "../types/analytics/analytics.types";

export const PERIODS: TPeriod[] = ["hoy", "mes", "7dias", "30dias", "6meses", "12meses", "todo"];

export const DEFAULT_PERIOD: TPeriod = "30dias";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const pad = (n: number) => String(n).padStart(2, "0");

/** "YYYY-MM-DD" de un Date que representa un dia de calendario en UTC. */
const isoDay = (date: Date) => `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;

/** Hoy en la zona del negocio, como dia de calendario en UTC (sin horas). */
const today = () => {
    const [y, m, d] = new Intl.DateTimeFormat("en-CA", {
        timeZone: ANALYTICS_TIMEZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date()).split("-").map(Number);

    return new Date(Date.UTC(y, m - 1, d));
};

const addDays = (date: Date, days: number) => {
    const copy = new Date(date);
    copy.setUTCDate(copy.getUTCDate() + days);
    return copy;
};

/** Primer dia del mes, desplazado `months` meses. */
const monthStart = (date: Date, months = 0) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1));

export const normalizePeriod = (period?: string): TPeriod =>
    PERIODS.includes(period as TPeriod) ? period as TPeriod : DEFAULT_PERIOD;

/** Rango (YYYY-MM-DD), dimension de GA y granularidad de cada periodo. */
export const periodConfig = (period: TPeriod): TPeriodConfig => {
    const now = today();
    const end = isoDay(now);

    switch (period) {
        case "hoy":
            return { start: end, end, gaDim: "hour", gran: "hour", label: "Hoy" };
        case "mes":
            return { start: isoDay(monthStart(now)), end, gaDim: "date", gran: "day", label: "Este mes" };
        case "7dias":
            return { start: isoDay(addDays(now, -6)), end, gaDim: "date", gran: "day", label: "Últimos 7 días" };
        case "6meses":
            return { start: isoDay(monthStart(now, -5)), end, gaDim: "yearMonth", gran: "month", label: "Últimos 6 meses" };
        case "12meses":
            return { start: isoDay(monthStart(now, -11)), end, gaDim: "yearMonth", gran: "month", label: "Últimos 12 meses" };
        case "todo":
            return { start: "2020-01-01", end, gaDim: "yearMonth", gran: "month", label: "Todo el tiempo" };
        case "30dias":
        default:
            return { start: isoDay(addDays(now, -29)), end, gaDim: "date", gran: "day", label: "Últimos 30 días" };
    }
};

/** Lista ordenada de buckets: keys canonicas y etiquetas legibles. */
export const buildBuckets = (start: string, end: string, gran: TGranularity): TBuckets => {
    const keys: string[] = [];
    const labels: string[] = [];

    if (gran === "hour") {
        for (let h = 0; h < 24; h++) {
            keys.push(pad(h));
            labels.push(`${pad(h)}:00`);
        }
    } else if (gran === "day") {
        const last = new Date(`${end}T00:00:00Z`);

        for (let cur = new Date(`${start}T00:00:00Z`); cur <= last; cur = addDays(cur, 1)) {
            keys.push(isoDay(cur));
            labels.push(`${pad(cur.getUTCDate())}/${pad(cur.getUTCMonth() + 1)}`);
        }
    } else {
        const last = monthStart(new Date(`${end}T00:00:00Z`));

        for (let cur = monthStart(new Date(`${start}T00:00:00Z`)); cur <= last; cur = monthStart(cur, 1)) {
            keys.push(isoDay(cur).slice(0, 7));
            labels.push(`${MONTHS[cur.getUTCMonth()]} ${String(cur.getUTCFullYear()).slice(2)}`);
        }
    }

    return { keys, labels };
};

/** Valor de dimension de GA a key de bucket: "8" -> "08", 20240115 -> 2024-01-15, 202401 -> 2024-01. */
export const gaKey = (value: string, gran: TGranularity) => {
    if (gran === "hour") return value.padStart(2, "0");
    if (gran === "day") return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
    return `${value.slice(0, 4)}-${value.slice(4, 6)}`;
};

/** Bucket de PostHog a key: "2024-01-15 14:00:00" -> "14", "2024-01-15", "2024-01-01" -> "2024-01". */
export const phKey = (value: string, gran: TGranularity) => {
    if (gran === "hour") return value.slice(11, 13);
    if (gran === "day") return value.slice(0, 10);
    return value.slice(0, 7);
};

/** Alinea un mapa key -> valor a los buckets del periodo (los huecos valen 0). */
export const alignToBuckets = (map: Map<string, number>, buckets: TBuckets) =>
    buckets.keys.map(key => map.get(key) ?? 0);
