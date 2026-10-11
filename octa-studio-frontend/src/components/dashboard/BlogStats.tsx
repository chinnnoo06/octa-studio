import Link from 'next/link';
import type { TBlogStats } from '@/schemas/blog/blog.schemas';
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatMetrics';
import { DashCard } from './DashCard';
import { KpiCard } from './kpis/KpiCard';
import { KpiRow } from './kpis/KpiRow';
import { RankList } from './lists/RankList';

/** Bloque "Blog" con datos internos: totales por estado, vistas y mas leidos. */
export const BlogStats = ({ stats }: { stats: TBlogStats | null }) => {
    return (
        <DashCard
            full
            title="Blog"
            tip="Datos internos del blog (no de Google Analytics): totales por estado, vistas acumuladas en el sitio y artículos más leídos."
            link={{ href: '/admin/blogs', label: 'Administrar' }}
        >
            {!stats ? (
                <p className="m-0 flex min-h-40 items-center justify-center rounded-[8px] border-2 border-dashed border-[#e3e7eb] p-5 text-center text-[13px] text-gray-600">
                    No se pudieron cargar las estadísticas del blog.
                </p>
            ) : (
                <>
                    <div className="mb-3.75">
                        <KpiRow columns={4}>
                            <KpiCard label="Total de entradas" value={formatNumber(stats.total)} />
                            <KpiCard label="Publicadas" value={formatNumber(stats.published)} />
                            <KpiCard label="Borradores" value={formatNumber(stats.drafts)} />
                            <KpiCard label="Vistas totales" value={formatNumber(stats.totalViews)} accent />
                        </KpiRow>
                    </div>

                    <h4 className="text-ink mb-2.5 text-[15px] font-semibold">Artículos más leídos</h4>

                    <RankList
                        emptyMessage="Aún no hay artículos publicados."
                        items={stats.mostRead.map((blog) => ({
                            label: blog.title,
                            value: blog.views,
                            href: `/admin/blogs/${blog._id}/editar`,
                        }))}
                    />

                    {stats.latest && (
                        <p className="mt-3.75 text-[13.5px] text-[#777]">
                            Último publicado:{' '}
                            <Link href={`/blogs/${stats.latest.slug}`} target="_blank" className="text-secondary font-semibold hover:underline">
                                {stats.latest.title}
                            </Link>{' '}
                            — {formatDate(stats.latest.createdAt)}
                        </p>
                    )}
                </>
            )}
        </DashCard>
    );
};
