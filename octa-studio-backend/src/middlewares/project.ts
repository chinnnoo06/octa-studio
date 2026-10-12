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

    // SEO opcional: lo vacio lo llena el servicio con el titulo y el resumen.
    await body("seo.metaTitle").optional({ values: "falsy" }).isString().isLength({ max: 60 }).withMessage("Meta title must be 60 characters or less").run(req)
    await body("seo.metaDescription").optional({ values: "falsy" }).isString().isLength({ max: 160 }).withMessage("Meta description must be 160 characters or less").run(req)

    // Al editar: archivos actuales que se conservan (los demas se borran).
    await body("keepImages").optional().isArray({ max: 5 }).withMessage("keepImages must be a list").run(req)
    await body("keepVideos").optional().isArray({ max: 5 }).withMessage("keepVideos must be a list").run(req)

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
