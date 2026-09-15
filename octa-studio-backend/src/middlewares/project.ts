import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { TProjectDocument } from "../types/project/project.types";
import { HttpError } from "../utils/error";
import { TMongoIdParams, TSlugParams } from "../types/common/common.dtos";
import { projectRepository } from "../repositories/project.repository";

declare global {
    namespace Express {
        interface Request {
            Project?: TProjectDocument
        }
    }
}

export const validateProjectInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("name").notEmpty().withMessage("Name is required").run(req)
    await body("description").notEmpty().withMessage("Description is required").run(req)
    await body("sector").notEmpty().withMessage("Sector is required").run(req)

    await body("seo.metaTitle").notEmpty().withMessage("Meta title is required").run(req)
    await body("seo.metaDescription").notEmpty().withMessage("Meta description is required").run(req)

    next()
}

export const validateProjectExistsBySlug = async (req: Request<TSlugParams>, res: Response, next: NextFunction) => {
    const { slug } = req.params

    try {
        const Project = await projectRepository.findBySlug(slug.trim().toLowerCase())

        if (!Project) {
            throw new HttpError(404, "Project not found")
        }

        req.Project = Project

        next()
    } catch (error) {
        next(error)
    }
}

export const validateProjectExists = async (req: Request<TMongoIdParams>, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const Project = await projectRepository.findById(id)

        if (!Project) {
            throw new HttpError(404, "Project not found")
        }

        req.Project = Project

        next()
    } catch (error) {
        next(error)
    }
}
