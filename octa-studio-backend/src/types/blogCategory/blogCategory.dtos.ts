import { TSeo } from "../common/common.types";

export type TBlogCategoryDto = {
    name: string,
    description: string,
    seo?: Partial<TSeo>
}
