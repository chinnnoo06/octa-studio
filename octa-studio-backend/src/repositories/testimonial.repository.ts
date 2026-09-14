import { Testimonial } from "../models/Testimonial";
import { TTestimonial } from "../types/testimonial/testimonial.types";

export const testimonialRepository = {

    async findAll() {
        return Testimonial.find().sort({ createdAt: -1 });
    },

    async findById(id: string) {
        return Testimonial.findById(id);
    },

    async createTestimonial(data: TTestimonial) {
        return Testimonial.create(data)
    }
}
