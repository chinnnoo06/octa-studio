import { Project } from "../models/Project";
import { TProject } from "../types/project/project.types";

export const projectRepository = {
    async findById(id: string) {
        return Project.findById(id);
    },

    async findPaginated(page: number, limit: number) {
        return Project.paginate({}, {
            page,
            limit,
            sort: { _id: -1 }
        });
    },

    async createProject(data: TProject) {
        return Project.create(data)
    },

    async getTotalCount() {
        return Project.countDocuments()
    },

}
