import type { NextFunction, Request, Response } from "express";
import { TBulkDeleteDto, TMongoIdParams } from "../types/common/common.dtos";
import { TRequestWithBlogCategory } from "../types/express/blogCategory";
import { TBlogCategoryDto } from "../types/blogCategory/blogCategory.dtos";
import { BlogCategoryService } from "../services/blogCategory.service";

export class BlogCategoryController {

    static getCategories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await BlogCategoryService.getCategories()

            return res.status(200).json({
                status: "success",
                categories
            });

        } catch (error) {
            console.error("Error retrieving the blog categories:", error);
            next(error)
        }
    }

    static getAdminCategories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await BlogCategoryService.getCategories(true)

            return res.status(200).json({
                status: "success",
                categories
            });

        } catch (error) {
            console.error("Error retrieving the admin blog categories:", error);
            next(error)
        }
    }

    static getCategory = async (req: TRequestWithBlogCategory<TMongoIdParams>, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json({
                status: "success",
                category: req.BlogCategory
            });

        } catch (error) {
            console.error("Error retrieving the blog category:", error);
            next(error)
        }
    }

    static createCategory = async (req: Request<{}, {}, TBlogCategoryDto>, res: Response, next: NextFunction) => {
        try {
            await BlogCategoryService.createCategory(req.body)

            return res.status(201).json({
                status: "success",
                message: "Blog category created successfully"
            });

        } catch (error) {
            console.error("Error creating the blog category:", error);
            next(error)
        }
    }

    static updateCategory = async (req: TRequestWithBlogCategory<TMongoIdParams, {}, TBlogCategoryDto>, res: Response, next: NextFunction) => {
        try {
            await BlogCategoryService.updateCategory(req.BlogCategory, req.body)

            return res.status(200).json({
                status: "success",
                message: "Blog category updated successfully"
            });

        } catch (error) {
            console.error("Error updating the blog category:", error);
            next(error)
        }
    }

    static deleteCategory = async (req: TRequestWithBlogCategory<TMongoIdParams>, res: Response, next: NextFunction) => {
        try {
            await BlogCategoryService.deleteCategory(req.BlogCategory)

            return res.status(200).json({
                status: "success",
                message: "Blog category deleted successfully"
            });

        } catch (error) {
            console.error("Error deleting the blog category:", error);
            next(error)
        }
    }

    static deleteCategories = async (req: Request<{}, {}, TBulkDeleteDto>, res: Response, next: NextFunction) => {
        try {
            const deleted = await BlogCategoryService.deleteCategories(req.body.ids)

            return res.status(200).json({
                status: "success",
                message: `${deleted} blog category(ies) deleted successfully`
            });

        } catch (error) {
            console.error("Error deleting the blog categories:", error);
            next(error)
        }
    }
}
