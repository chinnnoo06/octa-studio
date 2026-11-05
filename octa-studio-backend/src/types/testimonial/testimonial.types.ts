import { HydratedDocument } from "mongoose";

export type TTestimonial = {
    quote: string,
    name: string,
    rating: number,
    image: string
}


export type TTestimonialDocument = HydratedDocument<TTestimonial>
