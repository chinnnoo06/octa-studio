import { Request } from "express"
import { TTestimonialDocument } from "../testimonial/testimonial.types"

export interface TRequestWithTestimonial<
    P = {},
    ResB = unknown,
    ReqB = unknown,
    Q = {}
> extends Request<P, ResB, ReqB, Q> {
    Testimonial: TTestimonialDocument
}
