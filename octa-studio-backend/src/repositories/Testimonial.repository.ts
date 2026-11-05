import { QueryFilter, SortOrder } from "mongoose";
import { Testimonial } from "../models/Testimonial";
import { TTestimonial } from "../types/testimonial/testimonial.types";
import { TGetAdminTestimonialsQuery } from "../types/testimonial/testimonial.dtos";
import { buildSort, dateRangeFilter, searchFilter } from "../utils/listQuery";

const ADMIN_SORTABLE = ["name", "rating", "createdAt"];

export class TestimonialRepository {

    static async findAll() {
        return Testimonial.find().sort({ createdAt: -1 });
    }

    /** El modelo no lleva mongoose-paginate: se pagina a mano con la misma forma de respuesta. */
    static async findPaginated(page: number, limit: number, filter: QueryFilter<TTestimonial>, sort: Record<string, SortOrder>) {
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
    }

    /** Listado del panel: arma el filtro y el orden a partir del DTO de la query. */
    static async findAdminPaginated(query: TGetAdminTestimonialsQuery, limit: number) {
        const { page, search, rating, from, to, sort, order } = query

        const filter: QueryFilter<TTestimonial> = {
            ...searchFilter(search, ["name", "quote"]),
            ...(rating !== undefined && rating !== "" ? { rating: Number(rating) } : {}),
            ...dateRangeFilter(from, to)
        }

        return this.findPaginated(
            Number(page ?? 1),
            limit,
            filter,
            buildSort(sort, order, ADMIN_SORTABLE)
        )
    }

    static async findById(id: string) {
        return Testimonial.findById(id);
    }

    static async findByIds(ids: string[]) {
        return Testimonial.find({ _id: { $in: ids } });
    }

    static async deleteByIds(ids: string[]) {
        return Testimonial.deleteMany({ _id: { $in: ids } });
    }

    static async createTestimonial(data: TTestimonial) {
        return Testimonial.create(data)
    }
}
