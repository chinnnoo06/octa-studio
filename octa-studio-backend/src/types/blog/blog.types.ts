import { HydratedDocument, Types } from "mongoose";
import { TSeo } from "../common/common.types";

/** Un borrador solo se ve en el panel; la web publica lo trata como inexistente. */
export enum BlogStatus {
    PUBLISHED = 'published',
    DRAFT = 'draft'
}

export type TBlog = {
    slug: string,
    title: string,
    excerpt: string,
    category: Types.ObjectId | null,
    status: BlogStatus,
    views: number,
    image: string,
    content: string,
    seo: TSeo
}

/** El tiempo de lectura no se guarda: es un virtual calculado del contenido. */
export type TBlogVirtuals = {
    readingTime: number
}

export type TBlogDocument = HydratedDocument<TBlog>
