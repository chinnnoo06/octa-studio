import { QueryFilter } from "mongoose";
import { Blog } from "../models/Blog";
import { TBlog } from "../types/blog/blog.types";

export const blogRepository = {

    async findById(id: string) {
        return Blog.findById(id);
    },

    async findPaginated(page: number, limit: number, filter: QueryFilter<TBlog>) {
        return Blog.paginate(filter, {
            page,
            limit,
            sort: { createdAt: -1 }
        });
    },

    async findBySlug(slug: string) {
        return Blog.findOne({ slug });
    },

    /** Solo el HTML de cada blog: lo usa el job que limpia imagenes huerfanas. */
    async findAllContent() {
        return Blog.find({}, { content: 1 }).lean<{ content: string }[]>();
    },

    async createBlog(data: TBlog) {
        return Blog.create(data)
    }
}
