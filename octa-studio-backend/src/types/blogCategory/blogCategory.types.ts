import { HydratedDocument } from "mongoose";

export type TBlogCategorySEO = {
    metaTitle: string,
    metaDescription: string
}

export type TBlogCategory = {
    name: string,
    slug: string,
    description: string,
    seo: TBlogCategorySEO,
    /** Orden en el panel y en el filtro publico del blog. */
    position: number
}

export type TBlogCategoryDocument = HydratedDocument<TBlogCategory>

/**
 * Las categorias que antes estaban fijas en el codigo. Se siembran una sola vez
 * si la coleccion esta vacia, para no perder la clasificacion de los blogs.
 */
export const LEGACY_BLOG_CATEGORIES = [
    'Diseño de Stands',
    'Montaje y Logística',
    'Materiales y Sustentabilidad',
    'Casos de Éxito / Proyectos',
    'Guías para Expositores',
    'Ferias y Eventos',
    'Tendencias en Exhibición Comercial',
    'Noticias Octa'
]
