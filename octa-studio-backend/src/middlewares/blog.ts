import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { BlogStatus, TBlogDocument } from "../types/blog/blog.types";
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
    // Extracto opcional: vacio, el servicio lo genera del contenido.
    await body("excerpt").optional({ values: "falsy" }).isString().isLength({ max: 300 }).withMessage("Excerpt must be 300 characters or less").run(req)
    // Categoria opcional ("Sin categoría"); si viene, es el id de una BlogCategory.
    await body("category").optional({ values: "falsy" }).isMongoId().withMessage("Invalid category").run(req)
    await body("status").isIn(Object.values(BlogStatus)).withMessage("Invalid status").run(req)

    // SEO opcional: lo vacio lo llena el servicio con el titulo y el resumen.
    await body("seo.metaTitle").optional({ values: "falsy" }).isString().isLength({ max: 60 }).withMessage("Meta title must be 60 characters or less").run(req)
    await body("seo.metaDescription").optional({ values: "falsy" }).isString().isLength({ max: 160 }).withMessage("Meta description must be 160 characters or less").run(req)

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
        // Ruta publica: un borrador responde igual que un slug inexistente.
        const Blog = await blogRepository.findPublishedBySlug(slug.trim().toLowerCase())

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
