import { QueryFilter, SortOrder } from "mongoose";
import { Project } from "../models/Project";
import { TProject } from "../types/project/project.types";

export const projectRepository = {
    async findById(id: string) {
        return Project.findById(id);
    },

    async findBySlug(slug: string) {
        return Project.findOne({ slug });
    },

    async findPaginated(page: number, limit: number, filter: QueryFilter<TProject> = {}, sort: Record<string, SortOrder> = { _id: -1 }) {
        return Project.paginate(filter, {
            page,
            limit,
            sort
        });
    },

    async findByIds(ids: string[]) {
        return Project.find({ _id: { $in: ids } });
    },

    async deleteByIds(ids: string[]) {
        return Project.deleteMany({ _id: { $in: ids } });
    },

    /** Sectores distintos, ordenados: alimentan el filtro del panel. */
    async findSectors() {
        const sectors = await Project.distinct("sector");

        return sectors.filter(Boolean).sort((a, b) => a.localeCompare(b, "es"));
    },

    async createProject(data: TProject) {
        return Project.create(data)
    },

    async getTotalCount() {
        return Project.countDocuments()
    },

}
