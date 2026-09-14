import { Request } from "express"
import { TBlogDocument } from "../blog/blog.types"

export interface TRequestWithBlog<
    P = {},
    ResB = unknown,
    ReqB = unknown,
    Q = {}
> extends Request<P, ResB, ReqB, Q> {
    Blog: TBlogDocument
}
