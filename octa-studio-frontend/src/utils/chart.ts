import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartOptions,
  type ScriptableContext,
} from 'chart.js';

// Registro unico de lo que usan las graficas del dashboard (tree-shaking de Chart.js).
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

/** Colores de las series. `brand` es el azul de Octa; el resto, los de siempre del dashboard. */
export const CHART_COLORS = {
  brand: '#18608C',
  blue: '#3498db',
  wa: '#25D366',
  amber: '#f39c12',
  purple: '#9b59b6',
  red: '#e74c3c',
  teal: '#16a085',
  orange: '#e67e22',
} as const;

/** Paleta de las donas: el azul de marca primero, luego tonos bien separados. */
export const CHART_PALETTE = ['#18608C', '#f39c12', '#3498db', '#9b59b6', '#e74c3c', '#16a085', '#e67e22', '#34495e'];

export const CHART_TOOLTIP = {
  backgroundColor: '#1e2533',
  titleColor: '#fff',
  bodyColor: '#cbd2dc',
  padding: 10,
  cornerRadius: 6,
  displayColors: true,
} as const;

const GRID = 'rgba(0,0,0,0.05)';

/** "#18608C" -> "rgba(24,96,140,a)". */
export const rgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

/** Relleno degradado vertical bajo una linea; se calcula con el area real de la grafica. */
export const verticalGradient = (hex: string, alpha = 0.3) => (context: ScriptableContext<'line'>) => {
  const { ctx, chartArea } = context.chart;
  if (!chartArea) return rgba(hex, alpha / 2);

  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(0, rgba(hex, alpha));
  gradient.addColorStop(1, rgba(hex, 0));
  return gradient;
};

/** Opciones comunes de las graficas de linea en el tiempo. */
export const baseLineOptions = (): ChartOptions<'line'> => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 8, font: { size: 12 } } },
    tooltip: CHART_TOOLTIP,
  },
  scales: {
    x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 12 } },
    y: { beginAtZero: true, grid: { color: GRID }, ticks: { precision: 0 } },
  },
});

/** Opciones comunes de las barras horizontales (embudo, rankings). */
export const baseHBarOptions = (label: (value: number) => string, tick?: (value: number) => string): ChartOptions<'bar'> => ({
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { ...CHART_TOOLTIP, callbacks: { label: (item) => ` ${label(item.parsed.x ?? 0)}` } },
  },
  scales: {
    x: { beginAtZero: true, grid: { color: GRID }, ticks: tick ? { callback: (v) => tick(Number(v)) } : { precision: 0 } },
    y: { grid: { display: false } },
  },
});

export const GRID_COLOR = GRID;
