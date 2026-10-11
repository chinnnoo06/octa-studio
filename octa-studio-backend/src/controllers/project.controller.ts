import type { NextFunction, Request, Response } from "express";
import { TMulterFiles } from "../types/multer/multer.types";
import { TBulkDeleteDto, TMongoIdParams } from "../types/common/common.dtos";
import { TRequestWithProject } from "../types/express/project";
import { TGetAdminProjectsQuery, TGetProjectsQuery, TProjectDto } from "../types/project/project.dtos";
import { ProjectService } from "../services/project.service";



export class ProjectController {

    static createProject = async (req: Request<{}, {}, TProjectDto>, res: Response, next: NextFunction) => {
        const data = req.body;
        const files = req.files as TMulterFiles;

        try {
            await ProjectService.createProject(data, files)

            return res.status(201).json({
                status: "success",
                message: "Project created successfully"
            });

        } catch (error) {
            console.error("Error creating the project:", error);
            next(error)
        }
    }

     static updateProject = async (req: TRequestWithProject<TMongoIdParams, {}, TProjectDto>, res: Response, next: NextFunction) => {
        const data = req.body

        try {
            await ProjectService.updateProject(req.Project, data)

            return res.status(200).json({
                status: "success",
                message: "Project updated successfully"
            });
        } catch (error) {
            console.error("Error updating the project:", error);
            next(error)
        }
    }

    static updateProjectImages = async (req: TRequestWithProject<TMongoIdParams>, res: Response, next: NextFunction) => {
        const files = req.files as TMulterFiles

        try {
            await ProjectService.updateProjectImages(req.Project, files)

            return res.status(200).json({
                status: "success",
                message: "Project images updated successfully"
            });
        } catch (error) {
            console.error("Error updating the project images:", error);
            next(error)
        }
    }

    static updateProjectVideos = async (req: TRequestWithProject<TMongoIdParams>, res: Response, next: NextFunction) => {
        const files = req.files as TMulterFiles

        try {
            await ProjectService.updateProjectVideos(req.Project, files)

            return res.status(200).json({
                status: "success",
                message: "Project videos updated successfully"
            });
        } catch (error) {
            console.error("Error updating the project videos:", error);
            next(error)
        }
    }

    static deleteProject = async (req: TRequestWithProject<TMongoIdParams>, res: Response, next: NextFunction) => {
        try {
            await ProjectService.deleteProject(req.Project)

            return res.status(200).send({
                status: "success",
                message: "Project deleted successfully"
            });
        } catch (error) {
            console.error("Error deleting the project:", error);
            next(error)
        }
    }

    static getProjects = async (req: Request<{}, {}, {}, TGetProjectsQuery>, res: Response, next: NextFunction) => {
        const page = Number(req.query.page ?? 1)

        try {
            const { projects, pagination } = await ProjectService.getProjects(page)

            return res.status(200).json({
                status: "success",
                projects,
                pagination
            });

        } catch (error) {
            console.error("Error retrieving the projects:", error);
            next(error)
        }
    }

    static getAdminProjects = async (req: Request<{}, {}, {}, TGetAdminProjectsQuery>, res: Response, next: NextFunction) => {
        try {
            const { projects, pagination, sectors } = await ProjectService.getAdminProjects(req.query)

            return res.status(200).json({
                status: "success",
                projects,
                pagination,
                sectors
            });

        } catch (error) {
            console.error("Error retrieving the admin projects:", error);
            next(error)
        }
    }

    static deleteProjects = async (req: Request<{}, {}, TBulkDeleteDto>, res: Response, next: NextFunction) => {
        try {
            const deleted = await ProjectService.deleteProjects(req.body.ids)

            return res.status(200).json({
                status: "success",
                message: `${deleted} project(s) deleted successfully`
            });

        } catch (error) {
            console.error("Error deleting the projects:", error);
            next(error)
        }
    }

    static getProjectsCount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const total = await ProjectService.getTotalCount()

            return res.status(200).json({
                status: "success",
                total
            });

        } catch (error) {
            console.error("Error counting the projects:", error);
            next(error)
        }
    }

    static getProject = async (req: TRequestWithProject, res: Response, next: NextFunction) => {
        try {
            return res.status(200).send({
                status: "success",
                project: req.Project
            });

        } catch (error) {
            console.error("Error retrieving the project:", error);
            next(error)
        }
    }

}
