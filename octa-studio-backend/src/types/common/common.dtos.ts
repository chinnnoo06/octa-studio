export type TMongoIdParams = {
    id: string
}

export type TSlugParams = {
    slug: string
}

/** Orden de los listados del panel: el campo y su direccion. */
export type TSortOrder = 'asc' | 'desc'

/** Filtros comunes a todos los listados del panel. */
export type TAdminListQuery = {
    page?: string,
    search?: string,
    from?: string,
    to?: string,
    sort?: string,
    order?: TSortOrder
}

export type TBulkDeleteDto = {
    ids: string[]
}
