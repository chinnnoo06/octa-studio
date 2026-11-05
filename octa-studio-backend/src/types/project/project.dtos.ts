import { TAdminListQuery } from "../common/common.dtos";
import { TSeo } from "../common/common.types";

export type TCreateProjectDto = {
    name: string,
    description: string,
    sector: string,
    seo?: Partial<TSeo>
}

/** Edicion: archivos actuales que se conservan, en orden; si se omite, se conservan todos. */
export type TUpdateProjectDto = TCreateProjectDto & {
    keepImages?: string[],
    keepVideos?: string[]
}

export type TGetProjectsQuery = {
    page?: string,
}

export type TGetAdminProjectsQuery = TAdminListQuery & {
    sector?: string
}
