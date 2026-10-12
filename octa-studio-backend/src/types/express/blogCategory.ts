import { Request } from "express"
import { TBlogCategoryDocument } from "../blogCategory/blogCategory.types"

export interface TRequestWithBlogCategory<
    P = {},
    ResB = unknown,
    ReqB = unknown,
    Q = {}
> extends Request<P, ResB, ReqB, Q> {
    BlogCategory: TBlogCategoryDocument
}
