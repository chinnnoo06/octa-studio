import { TAdminListQuery } from "../common/common.dtos";
import { BlogCategory, BlogStatus, TBlogSEO } from "./blog.types";

export type TGetBlogsQuery = {
    page?: string,
    category?: BlogCategory
}

export type TGetAdminBlogsQuery = TAdminListQuery & {
    category?: BlogCategory,
    status?: BlogStatus
}

export type TBlogDto = {
    title: string,
    excerpt: string,
    category: BlogCategory,
    status: BlogStatus,
    readingTime: number,
    content: string,
    seo: TBlogSEO
}
