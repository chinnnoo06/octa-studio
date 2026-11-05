import { HydratedDocument } from "mongoose";
import { TSeo } from "../common/common.types";

export type TBlogCategory = {
    name: string,
    slug: string,
    description: string,
    seo: TSeo,
    /** Orden en el panel y en el filtro publico del blog. */
    position: number
}

export type TBlogCategoryDocument = HydratedDocument<TBlogCategory>
