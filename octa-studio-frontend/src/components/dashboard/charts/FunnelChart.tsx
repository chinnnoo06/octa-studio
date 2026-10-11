'use client';

import { Bar } from 'react-chartjs-2';
import { CHART_COLORS, CHART_TOOLTIP, GRID_COLOR } from '@/utils/chart';
import { formatNumber, hasData } from '@/utils/formatMetrics';
import { ChartBox } from './ChartBox';

type TFunnelChartProps = {
    steps: { step: string; count: number }[];
};

/** Visitaron -> vieron proyectos/servicios -> contactaron, con % sobre el primer paso. */
export const FunnelChart = ({ steps }: TFunnelChartProps) => {
    const data = steps.map((s) => s.count);
    const top = data[0] || 1;

    return (
        <ChartBox empty={!hasData(data) && 'Sin datos de embudo todavía.'}>
            <Bar
                options={{
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            ...CHART_TOOLTIP,
                            callbacks: {
                                label: (item) => {
                                    const value = item.parsed.x ?? 0;
                                    return ` ${formatNumber(value)} (${((value / top) * 100).toFixed(1)}%)`;
                                },
                            },
                        },
                    },
                    scales: {
                        x: { beginAtZero: true, grid: { color: GRID_COLOR }, ticks: { precision: 0 } },
                        y: { grid: { display: false } },
                    },
                }}
                data={{
                    labels: steps.map((s) => s.step),
                    datasets: [{
                        data,
                        backgroundColor: [CHART_COLORS.blue, CHART_COLORS.brand, CHART_COLORS.wa],
                        borderRadius: 6,
                        borderSkipped: false,
                    }],
                }}
            />
        </ChartBox>
    );
};
