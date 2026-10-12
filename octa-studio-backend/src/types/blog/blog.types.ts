import { HydratedDocument, Types } from "mongoose";

/** Un borrador solo se ve en el panel; la web publica lo trata como inexistente. */
export enum BlogStatus {
    PUBLISHED = 'published',
    DRAFT = 'draft'
}

export type TBlogSEO = {
    metaTitle: string,
    metaDescription: string
}

export type TBlog = {
    slug: string,
    title: string,
    excerpt: string,
    /** Referencia a BlogCategory; `null` = "Sin categoría". */
    category: Types.ObjectId | null,
    status: BlogStatus,
    /** Contador interno: sube una vez por sesion de navegador al abrir el articulo. */
    views: number,
    image: string,
    content: string,
    seo: TBlogSEO
}

/** El tiempo de lectura no se guarda: es un virtual calculado del contenido. */
export type TBlogVirtuals = {
    readingTime: number
}

export type TBlogDocument = HydratedDocument<TBlog>
