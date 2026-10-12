import { QueryFilter, SortOrder } from "mongoose";
import { Blog } from "../models/Blog";
import { BlogStatus, TBlog } from "../types/blog/blog.types";

/** Lo que ve la web publica: todo menos los borradores. Los blogs anteriores
 *  al campo `status` no lo tienen y cuentan como publicados. */
export const PUBLIC_BLOG_FILTER = { status: { $ne: BlogStatus.DRAFT } }

/** Lo que viaja de la categoria con cada blog. */
const CATEGORY_POPULATE = { path: "category", select: "name slug" }

export const blogRepository = {

    async findById(id: string) {
        return Blog.findById(id).populate(CATEGORY_POPULATE);
    },

    async findPaginated(page: number, limit: number, filter: QueryFilter<TBlog>, sort: Record<string, SortOrder> = { createdAt: -1 }) {
        return Blog.paginate(filter, {
            page,
            limit,
            sort,
            populate: CATEGORY_POPULATE
        });
    },

    async findBySlug(slug: string) {
        return Blog.findOne({ slug });
    },

    async findPublishedBySlug(slug: string) {
        return Blog.findOne({ slug, ...PUBLIC_BLOG_FILTER }).populate(CATEGORY_POPULATE);
    },

    /** Publicados mas recientes que cumplen `filter`, sin los `excludeIds`. */
    async findLatest(filter: QueryFilter<TBlog>, excludeIds: unknown[], limit: number) {
        if (limit <= 0) return [];

        return Blog.find({ ...PUBLIC_BLOG_FILTER, ...filter, _id: { $nin: excludeIds } })
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate(CATEGORY_POPULATE);
    },

    async findByIds(ids: string[]) {
        return Blog.find({ _id: { $in: ids } });
    },

    async deleteByIds(ids: string[]) {
        return Blog.deleteMany({ _id: { $in: ids } });
    },

    async incrementViews(slug: string) {
        return Blog.updateOne({ slug, ...PUBLIC_BLOG_FILTER }, { $inc: { views: 1 } });
    },

    /** Totales por estado y vistas acumuladas, en una sola pasada por la coleccion. */
    async getTotals() {
        const [totals] = await Blog.aggregate<{ total: number, drafts: number, totalViews: number }>([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    drafts: { $sum: { $cond: [{ $eq: ["$status", BlogStatus.DRAFT] }, 1, 0] } },
                    totalViews: { $sum: { $ifNull: ["$views", 0] } }
                }
            }
        ])

        return totals ?? { total: 0, drafts: 0, totalViews: 0 }
    },

    async findMostRead(limit: number) {
        return Blog.find(PUBLIC_BLOG_FILTER, { title: 1, slug: 1, views: 1 })
            .sort({ views: -1, createdAt: -1 })
            .limit(limit)
            .lean();
    },

    async findLatestPublished() {
        // `timestamps` no entra en TBlog: se tipa aqui lo que se proyecta.
        return Blog.findOne(PUBLIC_BLOG_FILTER, { title: 1, slug: 1, createdAt: 1 })
            .sort({ createdAt: -1 })
            .lean<{ _id: unknown, title: string, slug: string, createdAt: Date }>();
    },

    /** Solo el HTML de cada blog: lo usa el job que limpia imagenes huerfanas. */
    async findAllContent() {
        return Blog.find({}, { content: 1 }).lean<{ content: string }[]>();
    },

    async createBlog(data: Omit<TBlog, "views">) {
        return Blog.create(data)
    }
}
