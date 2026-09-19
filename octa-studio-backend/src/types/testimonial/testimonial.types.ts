import { HydratedDocument, Types } from "mongoose";

export type TTestimonial = {
    quote: string,
    name: string,
    rating: number,
    /** Nombre de archivo del logo de la empresa, en uploads/testimonials. */
    image: string
}

export type TTestimonialWithID = TTestimonial & { _id: Types.ObjectId }

export type TTestimonialDocument = HydratedDocument<TTestimonial>
