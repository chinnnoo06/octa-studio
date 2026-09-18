import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { TBlogDocument } from "../types/blog/blog.types";
import { HttpError } from "../utils/error";
import { TMongoIdParams, TSlugParams } from "../types/common/common.dtos";
import { blogRepository } from "../repositories/blog.repository";
import { contentToText, extractContentImages, sanitizeBlogContent } from "../utils/blogContent";

declare global {
    namespace Express {
        interface Request {
            Blog?: TBlogDocument
        }
    }
}

export const validateBlogInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("title").notEmpty().withMessage("Title is required").run(req)
    await body("excerpt").notEmpty().withMessage("Excerpt is required").run(req)
    await body("category").notEmpty().withMessage("Category is required").run(req)
    await body("readingTime").isInt({ min: 1 }).withMessage("Reading time must be a whole number of minutes, 1 or more").toInt().run(req)

    await body("seo.metaTitle").notEmpty().withMessage("Meta title is required").run(req)
    await body("seo.metaDescription").notEmpty().withMessage("Meta description is required").run(req)

    // El HTML del editor se sanea aqui y se sigue con la version limpia: lo
    // que llega al service y al modelo ya no lleva nada fuera de la lista.
    await body("content")
        .isString().withMessage("Content must be an HTML string")
        .bail()
        .customSanitizer((html: string) => sanitizeBlogContent(html))
        .custom((html: string) => {
            if (contentToText(html).length === 0 && extractContentImages(html).length === 0) {
                throw new Error("Content cannot be empty")
            }
            return true
        })
        .run(req)

    next()
}

export const validateBlogExistsBySlug = async (req: Request<TSlugParams>, res: Response, next: NextFunction) => {
    const { slug } = req.params

    try {
        const Blog = await blogRepository.findBySlug(slug.trim().toLowerCase())

        if (!Blog) {
            throw new HttpError(404, "Blog not found")
        }

        req.Blog = Blog

        next()
    } catch (error) {
        next(error)
    }
}

export const validateBlogExists = async (req: Request<TMongoIdParams>, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const Blog = await blogRepository.findById(id)

        if (!Blog) {
            throw new HttpError(404, "Blog not found")
        }

        req.Blog = Blog

        next()
    } catch (error) {
        next(error)
    }
}
