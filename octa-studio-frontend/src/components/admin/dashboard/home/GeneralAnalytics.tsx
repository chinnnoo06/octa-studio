import type { TDashboard } from '@/schemas/analytics/analytics.schemas';
import { CHART_COLORS } from '@/utils/admin/chart';
import { formatDuration, formatNumber } from '@/utils/admin/formatMetrics';
import { DashCard } from './DashCard';
import { KpiCard } from './kpis/KpiCard';
import { KpiRow } from './kpis/KpiRow';
import { TimeSeriesChart } from './charts/TimeSeriesChart';
import { FunnelChart } from './charts/FunnelChart';
import { HBarChart } from './charts/HBarChart';
import { HoursChart } from './charts/HoursChart';
import { DoughnutChart } from './charts/DoughnutChart';
import { RankList } from './lists/RankList';
import { TrafficList } from './lists/TrafficList';

/** KPIs y graficas generales del sitio, en el mismo orden que el dashboard de referencia. */
export const GeneralAnalytics = ({ dashboard: d }: { dashboard: TDashboard }) => {
    return (
        <>
            <KpiRow>
                <KpiCard
                    label="Sesiones"
                    value={formatNumber(d.kpis.sessions)}
                    tip="Número de visitas al sitio. Una sesión agrupa toda la actividad de un usuario; se reinicia tras 30 min de inactividad."
                />
                <KpiCard
                    label="Usuarios"
                    value={formatNumber(d.kpis.users)}
                    sub={`${formatNumber(d.kpis.newUsers)} nuevos`}
                    tip="Personas distintas que visitaron el sitio. Un mismo usuario puede tener varias sesiones."
                />
                <KpiCard
                    label="Vistas de página"
                    value={formatNumber(d.kpis.pageViews)}
                    tip="Total de páginas vistas, incluyendo recargas y vistas repetidas de la misma página."
                />
                <KpiCard
                    label="Tasa de rebote"
                    value={`${d.kpis.bounceRate}%`}
                    tip="Porcentaje de sesiones sin interacción significativa (se fueron sin explorar). Mientras más baja, mejor."
                />
                <KpiCard
                    label="Duración media"
                    value={formatDuration(d.kpis.avgSessionDuration)}
                    tip="Tiempo promedio que dura una sesión en el sitio. Más tiempo suele indicar mayor interés."
                />
                <KpiCard
                    accent
                    label="Conversiones"
                    value={formatNumber(d.kpis.conversions)}
                    sub={`${d.kpis.conversionRate}% tasa conv.`}
                    tip="Contactos generados: clics en WhatsApp, clics al teléfono y clics al correo."
                />
            </KpiRow>

            <DashCard
                full
                title="Sesiones y usuarios"
                tip="Evolución de sesiones (visitas totales) y usuarios únicos. Un usuario puede generar varias sesiones en el mismo período."
                source="ga"
            >
                <TimeSeriesChart
                    height={340}
                    labels={d.sessionsSeries.labels}
                    emptyMessage="Sin sesiones en este período (o Google Analytics aún procesa los datos)."
                    series={[
                        { label: 'Sesiones', data: d.sessionsSeries.sessions, color: CHART_COLORS.brand, fill: true },
                        { label: 'Usuarios', data: d.sessionsSeries.users, color: CHART_COLORS.blue, dashed: true },
                    ]}
                />
            </DashCard>

            <DashCard
                title="Conversiones en el tiempo"
                tip="Contactos recibidos por canal a lo largo del tiempo: WhatsApp, clic en teléfono y clic en correo. Datos en tiempo real vía PostHog."
                source="ph"
            >
                <TimeSeriesChart
                    labels={d.conversionsSeries.labels}
                    emptyMessage="Sin conversiones en este período. Los datos aparecerán conforme los visitantes interactúen."
                    series={[
                        { label: 'WhatsApp', data: d.conversionsSeries.whatsapp, color: CHART_COLORS.wa, fill: true },
                        { label: 'Teléfono', data: d.conversionsSeries.phone, color: CHART_COLORS.amber },
                        { label: 'Correo', data: d.conversionsSeries.email, color: CHART_COLORS.purple },
                    ]}
                />
            </DashCard>

            <DashCard
                title="Embudo de conversión"
                tip="Cuántos visitantes pasan por cada etapa: llegan al sitio → ven proyectos o servicios → contactan. Revela dónde se pierde más tráfico."
                source="ph"
            >
                <FunnelChart steps={d.funnel} />
            </DashCard>

            <DashCard
                title="Tiempo por sección"
                tip="Segundos totales de engagement en cada sección del sitio. Indica qué partes retienen más la atención de los visitantes."
                source="ga"
            >
                <HBarChart
                    labels={d.sectionEngagement.map((r) => r.section)}
                    data={d.sectionEngagement.map((r) => r.seconds)}
                    color={CHART_COLORS.purple}
                    unit="Tiempo"
                    format="duration"
                    emptyMessage="Sin datos de tiempo por sección."
                />
            </DashCard>

            <DashCard
                title="Horas de mayor actividad"
                tip="Distribución de sesiones por hora del día (zona horaria México). Útil para programar publicaciones o campañas en los momentos de mayor tráfico."
                source="ga"
            >
                <HoursChart labels={d.peakHours.labels} data={d.peakHours.data} />
            </DashCard>

            <DashCard
                title="Dispositivos"
                tip="Proporción de sesiones por tipo de dispositivo: escritorio, móvil y tablet. Ayuda a priorizar optimizaciones de diseño responsive."
                source="ga"
            >
                <DoughnutChart labels={d.devices.labels} data={d.devices.data} />
            </DashCard>

            <DashCard
                title="Nuevos vs recurrentes"
                tip="Usuarios que visitan el sitio por primera vez vs. los que ya habían regresado. Alta proporción de recurrentes indica fidelidad a la marca."
                source="ga"
            >
                <DoughnutChart labels={d.newVsReturning.labels} data={d.newVsReturning.data} />
            </DashCard>

            <DashCard
                title="Top búsquedas"
                tip="Búsquedas de Google con las que más visitantes llegaron al sitio (clics desde el buscador). Revela qué servicios o temas tienen más demanda."
                source="gsc"
            >
                <HBarChart
                    labels={d.topSearchTerms.map((r) => r.term)}
                    data={d.topSearchTerms.map((r) => r.count)}
                    color={CHART_COLORS.brand}
                    unit="clics"
                    emptyMessage="Sin datos en este período."
                />
            </DashCard>

            <DashCard
                title="Clics más frecuentes"
                tip="Elementos en los que más hacen clic los visitantes, capturados automáticamente por PostHog. Muestra qué llama más la atención."
                source="ph"
            >
                <HBarChart
                    labels={d.topEvents.map((r) => r.event)}
                    data={d.topEvents.map((r) => r.count)}
                    color={CHART_COLORS.orange}
                    unit="clics"
                    emptyMessage="Sin datos en este período."
                />
            </DashCard>

            <DashCard
                title="Páginas más visitadas"
                tip="Ranking de URLs con mayor número de vistas de página en el período seleccionado. Identifica el contenido más popular del sitio."
                source="ga"
            >
                <RankList
                    emptyMessage="Sin datos en este período."
                    items={d.topPages.map((page) => ({ label: page.url, value: page.views }))}
                />
            </DashCard>

            <DashCard
                title="Fuentes de tráfico"
                tip="Canales por los que llegan los visitantes: orgánico, directo, redes sociales, email, etc. Despliega cada fuente para ver las páginas de entrada."
                source="ga"
            >
                <TrafficList traffic={d.trafficSources} />
            </DashCard>
        </>
    );
};
