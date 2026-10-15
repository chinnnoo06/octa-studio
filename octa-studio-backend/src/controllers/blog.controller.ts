import type { NextFunction, Request, Response } from "express";
import { TMulterFiles } from "../types/multer/multer.types";
import { TBulkDeleteDto, TMongoIdParams, TSlugParams } from "../types/common/common.dtos";
import { TRequestWithBlog } from "../types/express/blog";
import { TBlogDto, TGetAdminBlogsQuery, TGetBlogsQuery } from "../types/blog/blog.dtos";
import { BlogService } from "../services/blog.service";

export class BlogController {

    static createBlog = async (req: Request<{}, {}, TBlogDto>, res: Response, next: NextFunction) => {
        const data = req.body;
        const files = req.files as TMulterFiles;

        try {
            await BlogService.createBlog(data, files)

            return res.status(201).json({
                status: "success",
                message: "Blog created successfully"
            });

        } catch (error) {
            console.error("Error creating the blog:", error);
            next(error)
        }
    }

    static updateBlog = async (req: TRequestWithBlog<TMongoIdParams, {}, TBlogDto>, res: Response, next: NextFunction) => {
        const data = req.body
        const files = req.files as TMulterFiles

        try {
            await BlogService.updateBlog(req.Blog, data, files)

            return res.status(200).json({
                status: "success",
                message: "Blog updated successfully"
            });

        } catch (error) {
            console.error("Error updating the blog:", error);
            next(error)
        }
    }

    static uploadContentImage = async (req: Request, res: Response, next: NextFunction) => {
        const files = req.files as TMulterFiles

        try {
            const path = BlogService.uploadContentImage(files)

            // Ruta relativa: el frontend la completa con el origen del backend que conoce.
            return res.status(201).json({
                status: "success",
                path
            });

        } catch (error) {
            console.error("Error uploading the content image:", error);
            next(error)
        }
    }

    static deleteBlog = async (req: TRequestWithBlog<TMongoIdParams>, res: Response, next: NextFunction) => {
        try {
            await BlogService.deleteBlog(req.Blog)

            return res.status(200).json({
                status: "success",
                message: "Blog deleted successfully"
            });

        } catch (error) {
            console.error("Error deleting the blog:", error);
            next(error)
        }
    }

    static getBlog = async (req: TRequestWithBlog, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json({
                status: "success",
                blog: req.Blog
            });

        } catch (error) {
            console.error("Error retrieving the blog:", error);
            next(error)
        }
    }

    static getBlogs = async (req: Request<{}, {}, {}, TGetBlogsQuery>, res: Response, next: NextFunction) => {
        const page = Number(req.query.page ?? 1)
        const category = req.query.category

        try {
            const { blogs, pagination } = await BlogService.getBlogs(page, category)

            return res.status(200).json({
                status: "success",
                blogs,
                pagination
            });

        } catch (error) {
            console.error("Error retrieving the blogs:", error);
            next(error)
        }
    }

    static getRelatedBlogs = async (req: TRequestWithBlog, res: Response, next: NextFunction) => {
        try {
            const blogs = await BlogService.getRelatedBlogs(req.Blog)

            return res.status(200).json({
                status: "success",
                blogs
            });

        } catch (error) {
            console.error("Error retrieving the related blogs:", error);
            next(error)
        }
    }

    static getAdminBlogs = async (req: Request<{}, {}, {}, TGetAdminBlogsQuery>, res: Response, next: NextFunction) => {
        try {
            const { blogs, pagination } = await BlogService.getAdminBlogs(req.query)

            return res.status(200).json({
                status: "success",
                blogs,
                pagination
            });

        } catch (error) {
            console.error("Error retrieving the admin blogs:", error);
            next(error)
        }
    }

    static getBlogStats = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const stats = await BlogService.getStats()

            return res.status(200).json({
                status: "success",
                stats
            });

        } catch (error) {
            console.error("Error retrieving the blog stats:", error);
            next(error)
        }
    }

    static registerView = async (req: Request<TSlugParams>, res: Response, next: NextFunction) => {
        try {
            await BlogService.registerView(req.params.slug.trim().toLowerCase())

            return res.status(204).end();

        } catch (error) {
            console.error("Error registering the blog view:", error);
            next(error)
        }
    }

    static deleteBlogs = async (req: Request<{}, {}, TBulkDeleteDto>, res: Response, next: NextFunction) => {
        try {
            const deleted = await BlogService.deleteBlogs(req.body.ids)

            return res.status(200).json({
                status: "success",
                message: `${deleted} blog(s) deleted successfully`
            });

        } catch (error) {
            console.error("Error deleting the blogs:", error);
            next(error)
        }
    }
}
