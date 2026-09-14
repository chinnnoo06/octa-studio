import { Request } from "express"
import { TProjectDocument } from "../project/project.types"

export interface TRequestWithProject<
    P = {},
    ResB = unknown,
    ReqB = unknown,
    Q = {}
> extends Request<P, ResB, ReqB, Q> {
    Project: TProjectDocument
}
