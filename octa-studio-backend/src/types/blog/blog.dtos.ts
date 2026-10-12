import { TAdminListQuery } from "../common/common.dtos";
import { BlogStatus, TBlogSEO } from "./blog.types";

export type TGetBlogsQuery = {
    page?: string,
    /** Slug de la categoria (filtro publico `/blogs?categoria=`). */
    category?: string
}

export type TGetAdminBlogsQuery = TAdminListQuery & {
    /** Id de la categoria. */
    category?: string,
    status?: BlogStatus
}

export type TBlogDto = {
    title: string,
    /** Vacio: se genera a partir del contenido. */
    excerpt?: string,
    /** Id de la categoria; vacio = "Sin categoría". */
    category?: string,
    status: BlogStatus,
    content: string,
    /** Vacio o a medias: el servicio completa con el titulo y el extracto. */
    seo?: Partial<TBlogSEO>
}
