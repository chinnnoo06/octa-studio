import { HydratedDocument, Types } from "mongoose";

export type TTestimonial = {
    quote: string,
    name: string,
    rating: number
}

export type TTestimonialWithID = TTestimonial & { _id: Types.ObjectId }

export type TTestimonialDocument = HydratedDocument<TTestimonial>
