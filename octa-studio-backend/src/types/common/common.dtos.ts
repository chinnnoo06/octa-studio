export type TMongoIdParams = {
    id: string
}

export type TSlugParams = {
    slug: string
}

export type TSortOrder = 'asc' | 'desc'

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
