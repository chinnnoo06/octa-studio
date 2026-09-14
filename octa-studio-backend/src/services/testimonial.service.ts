import { testimonialRepository } from "../repositories/testimonial.repository";
import { TTestimonialDto } from "../types/testimonial/testimonial.dtos";
import { TTestimonialDocument } from "../types/testimonial/testimonial.types";

export const TestimonialService = {

    async getTestimonials() {
        return await testimonialRepository.findAll()
    },

    async createTestimonial(data: TTestimonialDto) {
        return await testimonialRepository.createTestimonial(data)
    },

    async updateTestimonial(testimonial: TTestimonialDocument, data: TTestimonialDto) {
        testimonial.quote = data.quote
        testimonial.name = data.name
        testimonial.rating = data.rating

        return await testimonial.save()
    },

    async deleteTestimonial(testimonial: TTestimonialDocument) {
        await testimonial.deleteOne()
    }
}
