'use client';

import { Doughnut } from 'react-chartjs-2';
import type { Plugin } from 'chart.js';
import { CHART_PALETTE, CHART_TOOLTIP } from '@/utils/chart';
import { formatNumber, hasData } from '@/utils/formatMetrics';
import { ChartBox } from './ChartBox';

type TDoughnutChartProps = {
    labels: string[];
    data: number[];
};

/** Dona con el total en el centro (dispositivos, nuevos vs recurrentes, fuentes del blog). */
export const DoughnutChart = ({ labels, data }: TDoughnutChartProps) => {
    const total = data.reduce((a, b) => a + b, 0);

    // El total va pintado en el hueco central despues de dibujar la dona.
    const center: Plugin<'doughnut'> = {
        id: 'centerTotal',
        afterDatasetDraw(chart) {
            const { ctx } = chart;
            const [arc] = chart.getDatasetMeta(0).data;
            if (!arc) return;

            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 20px sans-serif';
            ctx.fillStyle = '#333';
            ctx.fillText(formatNumber(total), arc.x, arc.y - 6);
            ctx.font = '11px sans-serif';
            ctx.fillStyle = '#999';
            ctx.fillText('total', arc.x, arc.y + 12);
            ctx.restore();
        },
    };

    return (
        <ChartBox height={260} empty={!hasData(data) && 'Sin datos.'}>
            <Doughnut
                plugins={[center]}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '62%',
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, padding: 14 } },
                        tooltip: {
                            ...CHART_TOOLTIP,
                            callbacks: {
                                label: (item) => ` ${item.label}: ${formatNumber(item.parsed)} (${((item.parsed / (total || 1)) * 100).toFixed(1)}%)`,
                            },
                        },
                    },
                }}
                data={{
                    labels,
                    datasets: [{ data, backgroundColor: CHART_PALETTE, borderWidth: 2, hoverOffset: 6 }],
                }}
            />
        </ChartBox>
    );
};
