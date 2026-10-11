import { QueryFilter, SortOrder } from "mongoose";
import { Testimonial } from "../models/Testimonial";
import { TTestimonial } from "../types/testimonial/testimonial.types";

export const testimonialRepository = {

    async findAll() {
        return Testimonial.find().sort({ createdAt: -1 });
    },

    /** El modelo no lleva mongoose-paginate: se pagina a mano con la misma forma de respuesta. */
    async findPaginated(page: number, limit: number, filter: QueryFilter<TTestimonial>, sort: Record<string, SortOrder>) {
        const [docs, totalDocs] = await Promise.all([
            Testimonial.find(filter).sort(sort).skip((page - 1) * limit).limit(limit),
            Testimonial.countDocuments(filter)
        ])

        const totalPages = Math.ceil(totalDocs / limit)

        return {
            docs,
            totalDocs,
            limit,
            page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        }
    },

    async findById(id: string) {
        return Testimonial.findById(id);
    },

    async findByIds(ids: string[]) {
        return Testimonial.find({ _id: { $in: ids } });
    },

    async deleteByIds(ids: string[]) {
        return Testimonial.deleteMany({ _id: { $in: ids } });
    },

    async createTestimonial(data: TTestimonial) {
        return Testimonial.create(data)
    }
}
