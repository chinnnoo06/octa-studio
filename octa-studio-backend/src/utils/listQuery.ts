import { TSortOrder } from "../types/common/common.dtos";

/** Escapa lo que el usuario escribe en el buscador antes de meterlo en una RegExp. */
const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/** `$or` de busqueda insensible a mayusculas sobre los campos indicados. */
export const searchFilter = (search: string | undefined, fields: string[]) => {
    const term = search?.trim()

    if (!term) return {}

    const regex = new RegExp(escapeRegex(term), "i")

    return { $or: fields.map(field => ({ [field]: regex })) }
}

/** Rango sobre `createdAt` con fechas `YYYY-MM-DD`; `to` incluye el dia completo. */
export const dateRangeFilter = (from?: string, to?: string) => {
    const range: { $gte?: Date, $lte?: Date } = {}

    if (from) range.$gte = new Date(`${from}T00:00:00.000Z`)
    if (to) range.$lte = new Date(`${to}T23:59:59.999Z`)

    return Object.keys(range).length ? { createdAt: range } : {}
}

/**
 * Orden para `paginate`. Solo se aceptan los campos de la lista blanca; lo
 * demas cae en el orden por defecto (mas recientes primero).
 */
export const buildSort = (sort: string | undefined, order: TSortOrder | undefined, allowed: string[]) => {
    if (!sort || !allowed.includes(sort)) return { createdAt: -1 as const }

    return { [sort]: order === "asc" ? 1 as const : -1 as const }
}

/** Forma comun de la paginacion que devuelve cualquier listado. */
export const toPagination = (result: {
    page?: number,
    limit: number,
    totalDocs: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPrevPage: boolean
}) => ({
    page: result.page ?? 1,
    limit: result.limit,
    total: result.totalDocs,
    totalPages: result.totalPages,
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage
})
