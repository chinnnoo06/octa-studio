import { TProjectSEO } from "./project.types";

export type TProjectDto = {
    name: string,
    description: string,
    sector: string,
    seo: TProjectSEO
}

export type TGetProjectsQuery = {
    page?: string,
}
