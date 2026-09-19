import { model, Schema } from "mongoose";
import { TTestimonial } from "../types/testimonial/testimonial.types";

const TestimonialSchema = new Schema<TTestimonial>(
    {
        quote: {
            type: String,
            required: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },

        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Testimonial = model<TTestimonial>("Testimonial", TestimonialSchema, "testimonials")
