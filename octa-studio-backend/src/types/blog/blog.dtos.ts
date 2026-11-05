import { TAdminListQuery } from "../common/common.dtos";
import { TSeo } from "../common/common.types";
import { BlogStatus } from "./blog.types";

export type TGetBlogsQuery = {
    page?: string,
    category?: string
}

export type TGetAdminBlogsQuery = TAdminListQuery & {
    category?: string,
    status?: BlogStatus
}

export type TBlogDto = {
    title: string,
    excerpt?: string,
    category?: string,
    status: BlogStatus,
    content: string,
    seo?: Partial<TSeo>
}
