import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { TBlogCategoryDocument } from "../types/blogCategory/blogCategory.types";
import { TMongoIdParams } from "../types/common/common.dtos";
import { HttpError } from "../utils/error";
import { blogCategoryRepository } from "../repositories/blogCategory.repository";

declare global {
    namespace Express {
        interface Request {
            BlogCategory?: TBlogCategoryDocument
        }
    }
}

export const validateBlogCategoryInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 150 }).withMessage("Name must be 150 characters or less").run(req)
    await body("slug").optional({ values: "falsy" }).trim().matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).withMessage("The slug can only contain lowercase letters, numbers and hyphens").run(req)
    await body("description").optional({ values: "falsy" }).isString().isLength({ max: 300 }).withMessage("Description must be 300 characters or less").run(req)
    await body("seo.metaTitle").optional({ values: "falsy" }).isString().isLength({ max: 60 }).withMessage("Meta title must be 60 characters or less").run(req)
    await body("seo.metaDescription").optional({ values: "falsy" }).isString().isLength({ max: 160 }).withMessage("Meta description must be 160 characters or less").run(req)

    next()
}

export const validateBlogCategoryExists = async (req: Request<TMongoIdParams>, res: Response, next: NextFunction) => {
    try {
        const BlogCategory = await blogCategoryRepository.findById(req.params.id)

        if (!BlogCategory) {
            throw new HttpError(404, "Blog category not found")
        }

        req.BlogCategory = BlogCategory

        next()
    } catch (error) {
        next(error)
    }
}
