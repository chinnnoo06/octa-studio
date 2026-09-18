import { BlogCategory, TBlogSEO } from "./blog.types";

export type TGetBlogsQuery = {
    page?: string,
    category?: BlogCategory
}

export type TGetBlogsParams = {
    page: number,
    category?: BlogCategory
}

export type TBlogDto = {
    title: string,
    excerpt: string,
    category: BlogCategory,
    readingTime: number,
    /** HTML del editor. Llega crudo y validateBlogInput lo deja saneado. */
    content: string,
    seo: TBlogSEO
}
