import type { TDashboard } from '@/schemas/analytics/analytics.schemas';
import { CHART_COLORS } from '@/utils/admin/chart';
import { DashCard } from './DashCard';
import { TimeSeriesChart } from './charts/TimeSeriesChart';
import { DoughnutChart } from './charts/DoughnutChart';
import { RankList } from './lists/RankList';

/** Rendimiento del blog medido por Google Analytics (complementa el contador interno). */
export const BlogAnalytics = ({ blog }: { blog: TDashboard['blog'] }) => {
    return (
        <>
            <DashCard
                full
                title="Vistas del blog en el tiempo"
                tip="Vistas de página de todas las URLs del blog en el período seleccionado. Útil para ver el rendimiento por día/semana/mes y detectar qué publicaciones generan picos."
                source="ga"
            >
                <TimeSeriesChart
                    height={320}
                    labels={blog.series.labels}
                    emptyMessage="Sin vistas del blog en este período (o GA aún procesa los datos de hoy)."
                    series={[{ label: 'Vistas', data: blog.series.views, color: CHART_COLORS.brand, fill: true }]}
                />
            </DashCard>

            <DashCard
                title="Artículos más vistos"
                tip="Ranking de artículos por vistas de página según Google Analytics en el período. A diferencia del contador interno, refleja el tráfico real medido por GA."
                source="ga"
            >
                <RankList
                    emptyMessage="Sin datos de artículos en este período."
                    items={blog.top.map((post) => ({ label: post.title, value: post.views, href: post.path, external: true }))}
                />
            </DashCard>

            <DashCard
                title="Fuentes de tráfico al blog"
                tip="Canales por los que llegan las sesiones que aterrizan en el blog: orgánico (Google), directo, redes sociales, email, etc. Indica qué fuente atrae más lectores."
                source="ga"
            >
                <DoughnutChart labels={blog.sources.labels} data={blog.sources.data} />
            </DashCard>
        </>
    );
};
