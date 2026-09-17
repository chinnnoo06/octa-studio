import { HydratedDocument, Types } from "mongoose";

export type TParagraphBlock = {
    type: "paragraph",
    text: string
}

export type THeadingBlock = {
    type: "heading",
    level: 2 | 3,
    text: string
}

export type TListBlock = {
    type: "list",
    ordered: boolean,
    items: string[]
}

export type TQuoteBlock = {
    type: "quote",
    text: string,
    cite?: string
}

export type TBlogContentBlock =
    | TParagraphBlock
    | THeadingBlock
    | TListBlock
    | TQuoteBlock

export enum BlogCategory {
    STAND_DESIGN = 'Diseño de Stands',
    ASSEMBLY_AND_LOGISTICS = 'Montaje y Logística',
    MATERIALS_AND_SUSTAINABILITY = 'Materiales y Sustentabilidad',
    SUCCESS_CASES = 'Casos de Éxito / Proyectos',
    EXHIBITOR_GUIDES = 'Guías para Expositores',
    FAIRS_AND_EVENTS = 'Ferias y Eventos',
    EXHIBITION_TRENDS = 'Tendencias en Exhibición Comercial',
    OCTA_NEWS = 'Noticias Octa'
}

export type TBlogSEO = {
    metaTitle: string,
    metaDescription: string
}

export type TBlog = {
    slug: string,
    title: string,
    excerpt: string,
    category: BlogCategory,
    /** Minutos de lectura estimados. */
    readingTime: number,
    images: string[],
    content: TBlogContentBlock[],
    seo: TBlogSEO
}

export type TBlogWithID = TBlog & { _id: Types.ObjectId }

export type TBlogDocument = HydratedDocument<TBlog>
