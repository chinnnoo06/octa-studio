import { BlogCategory, TBlogContentBlock, TBlogSEO } from "./blog.types";

export type TGetBlogsQuery = {
    page?: string,
    category?: BlogCategory
}

export type TGetBlogsParams = {
    page: number,
    category?: BlogCategory
}

export type TBlogDto = {
    slug: string,
    title: string,
    excerpt: string,
    category: BlogCategory,
    content: TBlogContentBlock[],
    seo: TBlogSEO
}
