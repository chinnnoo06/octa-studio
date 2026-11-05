import path from "path";

import { ProjectRepository } from "../repositories/Project.repository";
import { TMulterFiles } from "../types/multer/multer.types";
import { TCreateProjectDto, TGetAdminProjectsQuery, TUpdateProjectDto } from "../types/project/project.dtos";
import { TProjectDocument } from "../types/project/project.types";
import { deleteAllUploadedFiles, deleteFilesByName } from "../utils/deleteFiles";
import { HttpError } from "../utils/error";
import { buildSlug } from "../utils/slug";
import { toPagination } from "../utils/listQuery";
import { buildSeo } from "../utils/seo";
import { UPLOADS_PATH } from "../config/env";

const imagesDir = path.resolve(UPLOADS_PATH, "projects");
const videosDir = path.resolve(UPLOADS_PATH, "projects/videos");

const PROJECTS_PER_PAGE = 6;

/** El panel muestra mas filas por pagina que la web. */
const ADMIN_PROJECTS_PER_PAGE = 10;

/** Tope de fotos y de videos por proyecto, el mismo del formulario. */
const MAX_MEDIA = 5;

export class ProjectService {

    static async createProject(data: TCreateProjectDto, files: TMulterFiles) {
        try {
            const slug = buildSlug(data.name)

            const slugTaken = await ProjectRepository.findBySlug(slug)

            if (slugTaken) {
                throw new HttpError(409, "A project with that name already exists");
            }

            // converToWebP already renamed each file, so `filename` is the name stored on disk
            const images = files.projectImages?.map(file => file.filename) ?? []

            if (images.length === 0) {
                throw new HttpError(400, "At least one image is required for the project");
            }

            // Los videos son opcionales: sin campo, lista vacia.
            const videos = files.projectVideos?.map(file => file.filename) ?? []

            await ProjectRepository.createProject({
                name: data.name,
                description: data.description,
                sector: data.sector,
                seo: buildSeo(data.seo, data.name, data.description),
                slug,
                images,
                videos
            })

        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    }

    static async updateProject(project: TProjectDocument, data: TUpdateProjectDto, files?: TMulterFiles) {
        try {
            const slug = buildSlug(data.name)

            if (slug !== project.slug) {
                const slugTaken = await ProjectRepository.findBySlug(slug)

                if (slugTaken) {
                    throw new HttpError(409, "A project with that name already exists");
                }
            }

            // Solo se aceptan como "conservados" archivos que ya eran del proyecto.
            const keptImages = (data.keepImages ?? project.images).filter(name => project.images.includes(name))
            const keptVideos = (data.keepVideos ?? project.videos).filter(name => project.videos.includes(name))

            const images = [...keptImages, ...(files?.projectImages?.map(file => file.filename) ?? [])]
            const videos = [...keptVideos, ...(files?.projectVideos?.map(file => file.filename) ?? [])]

            if (images.length === 0) {
                throw new HttpError(400, "At least one image is required for the project");
            }

            if (images.length > MAX_MEDIA || videos.length > MAX_MEDIA) {
                throw new HttpError(400, `A project can have up to ${MAX_MEDIA} images and ${MAX_MEDIA} videos`);
            }

            const removedImages = project.images.filter(name => !images.includes(name))
            const removedVideos = project.videos.filter(name => !videos.includes(name))

            project.slug = slug
            project.name = data.name
            project.description = data.description
            project.sector = data.sector
            project.seo = buildSeo(data.seo, data.name, data.description)
            project.images = images
            project.videos = videos

            await project.save()

            deleteFilesByName(imagesDir, removedImages)
            deleteFilesByName(videosDir, removedVideos)
        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    }

    static async deleteProject(project: TProjectDocument) {
        await project.deleteOne()

        deleteFilesByName(imagesDir, project.images)
        deleteFilesByName(videosDir, project.videos)
    }

    static async getProjects(page: number) {
        const result = await ProjectRepository.findPaginated(page, PROJECTS_PER_PAGE)

        return {
            projects: result.docs,
            pagination: toPagination(result)
        }
    }

    static async getAdminProjects(query: TGetAdminProjectsQuery) {
        const [result, sectors] = await Promise.all([
            ProjectRepository.findAdminPaginated(query, ADMIN_PROJECTS_PER_PAGE),
            ProjectRepository.findSectors()
        ])

        return {
            projects: result.docs,
            pagination: toPagination(result),
            sectors
        }
    }

    static async deleteProjects(ids: string[]) {
        const projects = await ProjectRepository.findByIds(ids)

        if (projects.length === 0) {
            throw new HttpError(404, "No projects found to delete");
        }

        await ProjectRepository.deleteByIds(projects.map(project => String(project._id)))

        projects.forEach(project => {
            deleteFilesByName(imagesDir, project.images)
            deleteFilesByName(videosDir, project.videos)
        })

        return projects.length
    }

    static async getTotalCount() {
        return await ProjectRepository.getTotalCount()
    }
}
