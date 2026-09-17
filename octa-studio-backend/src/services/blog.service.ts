import fs from "fs";
import path from "path";

import { blogRepository } from "../repositories/blog.repository";
import { TMulterFiles } from "../types/multer/multer.types";
import { TBlogDto, TGetBlogsParams } from "../types/blog/blog.dtos";
import { TBlogDocument } from "../types/blog/blog.types";
import { deleteAllUploadedFiles } from "../utils/deleteFiles";
import { HttpError } from "../utils/error";
import { buildSlug } from "../utils/slug";
import { UPLOADS_PATH } from "../config/env";

const imagesDir = path.resolve(UPLOADS_PATH, "blogs");

const BLOGS_PER_PAGE = 10;

const deleteImagesFromDisk = (images: string[]) => {
    images.forEach(image => {
        const filePath = path.join(imagesDir, image)

        try {
            fs.unlinkSync(filePath)
            console.log(`Image deleted: ${image}`);
        } catch (err) {
            console.error(`Error deleting ${image}`)
        }
    })
}

export const BlogService = {

    async getBlogs({ page, category }: TGetBlogsParams) {
        const filter = category ? { category } : {}

        const result = await blogRepository.findPaginated(page, BLOGS_PER_PAGE, filter)

        return {
            blogs: result.docs,
            pagination: {
                page: result.page,
                limit: result.limit,
                total: result.totalDocs,
                totalPages: result.totalPages,
                hasNextPage: result.hasNextPage,
                hasPrevPage: result.hasPrevPage
            }
        }
    },

    async createBlog(data: TBlogDto, files?: TMulterFiles) {
        try {
            const slug = buildSlug(data.title)

            const slugTaken = await blogRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A blog with that title already exists");
            }

            const images = files?.blogImages?.map(file => file.filename) ?? []

            if (images.length === 0) {
                throw new HttpError(400, "At least one image is required for the blog");
            }

            return await blogRepository.createBlog({
                ...data,
                slug,
                images
            })

        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    },

    async updateBlog(blog: TBlogDocument, data: TBlogDto) {
        const slug = buildSlug(data.title)

        if (slug !== blog.slug) {
            const slugTaken = await blogRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A blog with that title already exists");
            }
        }

        blog.slug = slug
        blog.title = data.title
        blog.excerpt = data.excerpt
        blog.category = data.category
        blog.readingTime = data.readingTime
        blog.content = data.content
        blog.seo = data.seo

        return await blog.save()
    },

    async updateBlogImages(blog: TBlogDocument, files?: TMulterFiles) {
        try {
            const images = files?.blogImages?.map(file => file.filename) ?? []

            if (images.length === 0) {
                throw new HttpError(400, "At least one image is required for the blog");
            }

            const oldImages = [...blog.images]

            blog.images = images
            await blog.save()

            deleteImagesFromDisk(oldImages)

            return blog
        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    },

    async deleteBlog(blog: TBlogDocument) {
        await blog.deleteOne()

        deleteImagesFromDisk(blog.images)
    }
}
