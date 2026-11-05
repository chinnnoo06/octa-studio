import { QueryFilter, SortOrder } from "mongoose";
import { Project } from "../models/Project";
import { TProject } from "../types/project/project.types";
import { TGetAdminProjectsQuery } from "../types/project/project.dtos";
import { buildSort, dateRangeFilter, searchFilter } from "../utils/listQuery";

const ADMIN_SORTABLE = ["name", "sector", "createdAt"];

export class ProjectRepository {

    static async findById(id: string) {
        return Project.findById(id);
    }

    static async findBySlug(slug: string) {
        return Project.findOne({ slug });
    }

    static async findPaginated(page: number, limit: number, filter: QueryFilter<TProject> = {}, sort: Record<string, SortOrder> = { _id: -1 }) {
        return Project.paginate(filter, {
            page,
            limit,
            sort
        });
    }

    static async findAdminPaginated(query: TGetAdminProjectsQuery, limit: number) {
        const { page, search, sector, from, to, sort, order } = query

        const filter: QueryFilter<TProject> = {
            ...searchFilter(search, ["name", "description", "sector"]),
            ...(sector ? { sector } : {}),
            ...dateRangeFilter(from, to)
        }

        return Project.paginate(filter, {
            page: Number(page ?? 1),
            limit,
            sort: buildSort(sort, order, ADMIN_SORTABLE)
        });
    }

    static async findByIds(ids: string[]) {
        return Project.find({ _id: { $in: ids } });
    }

    static async deleteByIds(ids: string[]) {
        return Project.deleteMany({ _id: { $in: ids } });
    }

    static async findSectors() {
        const sectors = await Project.distinct("sector");

        return sectors.filter(Boolean).sort((a, b) => a.localeCompare(b, "es"));
    }

    static async createProject(data: TProject) {
        return Project.create(data)
    }

    static async getTotalCount() {
        return Project.countDocuments()
    }
}
