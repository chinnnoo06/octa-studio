import fs from "fs";
import path from "path";

import { projectRepository } from "../repositories/project.repository";
import { TMulterFiles } from "../types/multer/multer.types";
import { TProjectDto } from "../types/project/project.dtos";
import { TProjectDocument } from "../types/project/project.types";
import { deleteAllUploadedFiles } from "../utils/deleteFiles";
import { HttpError } from "../utils/error";
import { buildSlug } from "../utils/slug";
import { UPLOADS_PATH } from "../config/env";

const imagesDir = path.resolve(UPLOADS_PATH, "projects");

const PROJECTS_PER_PAGE = 6;

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

export const ProjectService = {

    async createProject(data: TProjectDto, files?: TMulterFiles) {
        try {
            const slug = buildSlug(data.name)

            const slugTaken = await projectRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A project with that name already exists");
            }

            // converToWebP already renamed each file, so `filename` is the name stored on disk
            const images = files?.projectImages?.map(file => file.filename) ?? []

            if (images.length === 0) {
                throw new HttpError(400, "At least one image is required for the project");
            }

            return await projectRepository.createProject({ ...data, slug, images })

        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    },

    async updateProject(project: TProjectDocument, data: TProjectDto) {
        const slug = buildSlug(data.name)

        if (slug !== project.slug) {
            const slugTaken = await projectRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A project with that name already exists");
            }
        }

        project.slug = slug
        project.name = data.name
        project.description = data.description
        project.sector = data.sector
        project.seo = data.seo

        return await project.save()
    },

    async updateProjectImages(project: TProjectDocument, files?: TMulterFiles) {
        try {
            const images = files?.projectImages?.map(file => file.filename) ?? []

            if (images.length === 0) {
                throw new HttpError(400, "At least one image is required for the project");
            }

            // Keep a copy before overwriting, to delete the old files once the save succeeds
            const oldImages = [...project.images]

            project.images = images
            await project.save()

            deleteImagesFromDisk(oldImages)

            return project
        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    },

    async deleteProject(project: TProjectDocument) {
        await project.deleteOne()

        deleteImagesFromDisk(project.images)
    },

    async getProjects(page: number) {
        const result = await projectRepository.findPaginated(page, PROJECTS_PER_PAGE)

        return {
            projects: result.docs,
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

    async getTotalCount() {
        return await projectRepository.getTotalCount()
    }
}
