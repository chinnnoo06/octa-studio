export type TActionState = {
    error: string,
    success?: string
}

/** Query de los listados del panel tal como llega en `searchParams`. */
export type TAdminListParams = Record<string, string | undefined>

/** Un filtro del panel de un listado: un select o el par de fechas "Desde/Hasta". */
export type TFilterField =
    | { type: 'select'; name: string; label: string; options: { value: string; label: string }[] }
    | { type: 'dates' }
