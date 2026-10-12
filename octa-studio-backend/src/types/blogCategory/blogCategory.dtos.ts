import { TBlogCategorySEO } from "./blogCategory.types";

export type TBlogCategoryDto = {
    name: string,
    /** Vacio: se genera a partir del nombre. */
    slug?: string,
    description?: string,
    seo?: Partial<TBlogCategorySEO>
}
