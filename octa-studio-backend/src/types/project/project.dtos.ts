import { TAdminListQuery } from "../common/common.dtos";
import { TProjectSEO } from "./project.types";

export type TProjectDto = {
    name: string,
    description: string,
    sector: string,
    /** Vacio o a medias: el servicio completa con el nombre y la descripcion. */
    seo?: Partial<TProjectSEO>,
    /** Edicion: archivos actuales que se conservan, en orden. */
    keepImages?: string[],
    keepVideos?: string[]
}

export type TGetProjectsQuery = {
    page?: string,
}

export type TGetAdminProjectsQuery = TAdminListQuery & {
    sector?: string
}
