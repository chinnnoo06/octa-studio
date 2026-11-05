import { QueryFilter, SortOrder } from "mongoose";
import { Blog } from "../models/Blog";
import { BlogStatus, TBlog } from "../types/blog/blog.types";
import { TGetAdminBlogsQuery } from "../types/blog/blog.dtos";
import { buildSort, dateRangeFilter, searchFilter } from "../utils/listQuery";

export const PUBLIC_BLOG_FILTER = { status: { $ne: BlogStatus.DRAFT } }

const CATEGORY_POPULATE = { path: "category", select: "name slug" }

const ADMIN_SORTABLE = ["title", "status", "views", "createdAt"];

export class BlogRepository {

    static async findById(id: string) {
        return Blog.findById(id);
    }

    /** Blog completo con la categoria poblada: para la ficha del panel. */
    static async findByIdPopulated(id: string) {
        return Blog.findById(id).populate(CATEGORY_POPULATE);
    }

    static async findPaginated(page: number, limit: number, filter: QueryFilter<TBlog>, sort: Record<string, SortOrder> = { createdAt: -1 }) {
        return Blog.paginate(filter, {
            page,
            limit,
            sort,
            populate: CATEGORY_POPULATE
        });
    }

    /** Listado del panel: arma el filtro y el orden a partir del DTO de la query. */
    static async findAdminPaginated(query: TGetAdminBlogsQuery, limit: number) {
        const { page, search, category, status, from, to, sort, order } = query

        const filter: QueryFilter<TBlog> = {
            ...searchFilter(search, ["title", "excerpt"]),
            ...(category ? { category } : {}),
            ...(status ? { status } : {}),
            ...dateRangeFilter(from, to)
        }

        return Blog.paginate(filter, {
            page: Number(page ?? 1),
            limit,
            sort: buildSort(sort, order, ADMIN_SORTABLE),
            populate: CATEGORY_POPULATE
        });
    }

    static async findBySlug(slug: string) {
        return Blog.findOne({ slug });
    }

    static async findPublishedBySlug(slug: string) {
        return Blog.findOne({ slug, ...PUBLIC_BLOG_FILTER });
    }

    static async findLatest(filter: QueryFilter<TBlog>, excludeIds: unknown[], limit: number) {
        if (limit <= 0) return [];

        return Blog.find({ ...PUBLIC_BLOG_FILTER, ...filter, _id: { $nin: excludeIds } })
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate(CATEGORY_POPULATE);
    }

    static async findByIds(ids: string[]) {
        return Blog.find({ _id: { $in: ids } });
    }

    static async deleteByIds(ids: string[]) {
        return Blog.deleteMany({ _id: { $in: ids } });
    }

    static async incrementViews(slug: string) {
        return Blog.updateOne({ slug, ...PUBLIC_BLOG_FILTER }, { $inc: { views: 1 } });
    }

    /** Totales por estado y vistas acumuladas, en una sola pasada por la coleccion. */
    static async getTotals() {
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
    }

    static async findMostRead(limit: number) {
        return Blog.find(PUBLIC_BLOG_FILTER, { title: 1, slug: 1, views: 1 })
            .sort({ views: -1, createdAt: -1 })
            .limit(limit)
            .lean();
    }

    static async findLatestPublished() {
        // `timestamps` no entra en TBlog: se tipa aqui lo que se proyecta.
        return Blog.findOne(PUBLIC_BLOG_FILTER, { title: 1, slug: 1, createdAt: 1 })
            .sort({ createdAt: -1 })
            .lean<{ _id: unknown, title: string, slug: string, createdAt: Date }>();
    }

    /** Solo el HTML de cada blog: lo usa el job que limpia imagenes huerfanas. */
    static async findAllContent() {
        return Blog.find({}, { content: 1 }).lean<{ content: string }[]>();
    }

    static async createBlog(data: Omit<TBlog, "views">) {
        return Blog.create(data)
    }
}
