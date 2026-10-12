import { Types } from "mongoose";
import { BlogCategory } from "../models/BlogCategory";
import { Blog } from "../models/Blog";
import { TBlogCategory } from "../types/blogCategory/blogCategory.types";

export const blogCategoryRepository = {

    async findAll() {
        return BlogCategory.find().sort({ position: 1, name: 1 });
    },

    async findById(id: string) {
        return BlogCategory.findById(id);
    },

    async findBySlug(slug: string) {
        return BlogCategory.findOne({ slug });
    },

    async findByName(name: string) {
        return BlogCategory.findOne({ name });
    },

    async findByIds(ids: string[]) {
        return BlogCategory.find({ _id: { $in: ids } });
    },

    async count() {
        return BlogCategory.countDocuments();
    },

    async maxPosition() {
        const last = await BlogCategory.findOne({}, { position: 1 }).sort({ position: -1 }).lean();
        return last?.position ?? 0;
    },

    /** Entradas por categoria, para la columna "Entradas" del panel. */
    async countBlogsByCategory() {
        const rows = await Blog.aggregate<{ _id: Types.ObjectId, total: number }>([
            { $match: { category: { $type: "objectId" } } },
            { $group: { _id: "$category", total: { $sum: 1 } } }
        ]);

        return new Map(rows.map(row => [String(row._id), row.total]));
    },

    async create(data: TBlogCategory) {
        return BlogCategory.create(data);
    },

    async deleteByIds(ids: string[]) {
        return BlogCategory.deleteMany({ _id: { $in: ids } });
    },

    /** Al borrar una categoria sus entradas quedan "Sin categoría", como en el panel de referencia. */
    async unassignFromBlogs(ids: string[]) {
        return Blog.updateMany(
            { category: { $in: ids.map(id => new Types.ObjectId(id)) } },
            { $set: { category: null } }
        );
    }
}
