/** 12345 -> "12,345" con el formato de Mexico. */
export const formatNumber = (n?: number | null) => (n ?? 0).toLocaleString('es-MX');

/** Segundos a "3m 12s" / "45s", como la duracion media de sesion. */
export const formatDuration = (seconds?: number | null) => {
  const s = Math.round(seconds ?? 0);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m > 0 ? `${m}m ${r}s` : `${r}s`;
};

/** `true` si alguna serie tiene al menos un valor mayor que cero. */
export const hasData = (...series: (number[] | undefined)[]) => series.some((arr) => arr?.some((v) => v > 0));
