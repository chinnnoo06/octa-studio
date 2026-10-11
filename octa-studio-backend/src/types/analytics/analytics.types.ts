export type TPeriod = "hoy" | "mes" | "7dias" | "30dias" | "6meses" | "12meses" | "todo"

export type TGranularity = "hour" | "day" | "month"

export type TPeriodConfig = {
    start: string,
    end: string,
    gaDim: "hour" | "date" | "yearMonth",
    gran: TGranularity,
    label: string
}

export type TBuckets = {
    keys: string[],
    labels: string[]
}

/** Estado de cada fuente: `off` = sin credenciales todavia, `error` = fallo la peticion. */
export type TSourceStatus = "ok" | "error" | "off"

export type TLabelValue = {
    labels: string[],
    data: number[]
}

export type TTrafficSource = {
    totalVisits: number,
    pages: { url: string, visits: number }[]
}

export type TGAData = {
    status: TSourceStatus,
    kpis: {
        sessions: number,
        users: number,
        newUsers: number,
        bounceRate: number,
        avgSessionDuration: number,
        pageViews: number
    },
    series: { sessions: number[], users: number[] },
    devices: TLabelValue,
    topPages: { url: string, views: number }[],
    sectionEngagement: { section: string, seconds: number }[],
    trafficSources: { sources: Record<string, TTrafficSource>, totalSessions: number },
    newVsReturning: TLabelValue,
    peakHours: TLabelValue,
    blog: {
        views: number[],
        top: { title: string, path: string, views: number }[],
        sources: TLabelValue
    }
}

export type TConversionChannel = "whatsapp" | "phone" | "email"

export type TPostHogData = {
    status: TSourceStatus,
    totalConversions: number,
    conversionsSeries: Record<TConversionChannel, number[]>,
    topEvents: { event: string, count: number }[],
    funnel: { step: string, count: number }[]
}

export type TSearchConsoleData = {
    status: TSourceStatus,
    topQueries: { term: string, count: number }[]
}
