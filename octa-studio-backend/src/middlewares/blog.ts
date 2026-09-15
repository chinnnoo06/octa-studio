import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { TBlogContentBlock, TBlogDocument } from "../types/blog/blog.types";
import { HttpError } from "../utils/error";
import { TMongoIdParams, TSlugParams } from "../types/common/common.dtos";
import { blogRepository } from "../repositories/blog.repository";

declare global {
    namespace Express {
        interface Request {
            Blog?: TBlogDocument
        }
    }
}

const validateContentBlocks = (blocks: TBlogContentBlock[]) => {
    blocks.forEach((block, index) => {
        const position = `content[${index}]`

        switch (block?.type) {
            case "paragraph":
            case "quote":
                if (!block.text?.trim()) {
                    throw new Error(`${position}: text is required`)
                }
                break

            case "heading":
                if (!block.text?.trim()) {
                    throw new Error(`${position}: text is required`)
                }
                if (block.level !== 2 && block.level !== 3) {
                    throw new Error(`${position}: level must be 2 or 3`)
                }
                break

            case "list":
                if (typeof block.ordered !== "boolean") {
                    throw new Error(`${position}: ordered must be a boolean`)
                }
                if (!Array.isArray(block.items) || block.items.length === 0) {
                    throw new Error(`${position}: items must have at least one entry`)
                }
                break

            default:
                throw new Error(`${position}: invalid block type`)
        }
    })

    return true
}

export const validateBlogInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("title").notEmpty().withMessage("Title is required").run(req)
    await body("excerpt").notEmpty().withMessage("Excerpt is required").run(req)
    await body("category").notEmpty().withMessage("Category is required").run(req)

    await body("seo.metaTitle").notEmpty().withMessage("Meta title is required").run(req)
    await body("seo.metaDescription").notEmpty().withMessage("Meta description is required").run(req)

    await body("content").isArray({ min: 1 }).withMessage("Content must have at least one block")
        .bail()
        .custom(validateContentBlocks)
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
