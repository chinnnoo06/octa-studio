import fs from "fs";
import path from "path";

import { projectRepository } from "../repositories/project.repository";
import { TMulterFiles } from "../types/multer/multer.types";
import { TGetAdminProjectsQuery, TProjectDto } from "../types/project/project.dtos";
import { TProjectDocument } from "../types/project/project.types";
import { deleteAllUploadedFiles } from "../utils/deleteFiles";
import { HttpError } from "../utils/error";
import { buildSlug } from "../utils/slug";
import { buildSort, dateRangeFilter, searchFilter, toPagination } from "../utils/listQuery";
import { buildSeo } from "../utils/seo";
import { UPLOADS_PATH } from "../config/env";

const imagesDir = path.resolve(UPLOADS_PATH, "projects");
const videosDir = path.resolve(UPLOADS_PATH, "projects/videos");

const PROJECTS_PER_PAGE = 6;

/** El panel muestra mas filas por pagina que la web. */
const ADMIN_PROJECTS_PER_PAGE = 10;

const ADMIN_SORTABLE = ["name", "sector", "createdAt"];

/** Tope de fotos y de videos por proyecto, el mismo del formulario. */
const MAX_MEDIA = 5;

const deleteFilesFromDisk = (dir: string, names: string[]) => {
    names.forEach(name => {
        const filePath = path.join(dir, name)

        try {
            fs.unlinkSync(filePath)
            console.log(`File deleted: ${name}`);
        } catch (err) {
            console.error(`Error deleting ${name}`)
        }
    })
}

const deleteImagesFromDisk = (images: string[]) => deleteFilesFromDisk(imagesDir, images)
const deleteVideosFromDisk = (videos: string[]) => deleteFilesFromDisk(videosDir, videos)

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

            // Los videos son opcionales: sin campo, lista vacia.
            const videos = files?.projectVideos?.map(file => file.filename) ?? []

            await projectRepository.createProject({
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
    },

    /**
     * Edicion completa: datos, SEO y medios. `keepImages`/`keepVideos` son los
     * archivos actuales que se conservan (en ese orden); los nuevos se agregan
     * detras. Lo que deja de estar se borra del disco despues de guardar.
     */
    async updateProject(project: TProjectDocument, data: TProjectDto, files?: TMulterFiles) {
        try {
            const slug = buildSlug(data.name)

            if (slug !== project.slug) {
                const slugTaken = await projectRepository.findBySlug(slug)

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

            deleteImagesFromDisk(removedImages)
            deleteVideosFromDisk(removedVideos)
        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    },

    async deleteProject(project: TProjectDocument) {
        await project.deleteOne()

        deleteImagesFromDisk(project.images)
        deleteVideosFromDisk(project.videos)
    },

    async getProjects(page: number) {
        const result = await projectRepository.findPaginated(page, PROJECTS_PER_PAGE)

        return {
            projects: result.docs,
            pagination: toPagination(result)
        }
    },

    async getAdminProjects({ page, search, sector, from, to, sort, order }: TGetAdminProjectsQuery) {
        const filter = {
            ...searchFilter(search, ["name", "description", "sector"]),
            ...(sector ? { sector } : {}),
            ...dateRangeFilter(from, to)
        }

        const [result, sectors] = await Promise.all([
            projectRepository.findPaginated(
                Number(page ?? 1),
                ADMIN_PROJECTS_PER_PAGE,
                filter,
                buildSort(sort, order, ADMIN_SORTABLE)
            ),
            projectRepository.findSectors()
        ])

        return {
            projects: result.docs,
            pagination: toPagination(result),
            // Opciones del filtro "Sector": los que existen, no una lista fija.
            sectors
        }
    },

    /** Borrado masivo del panel: cada proyecto se lleva sus fotos y videos. */
    async deleteProjects(ids: string[]) {
        const projects = await projectRepository.findByIds(ids)

        if (projects.length === 0) {
            throw new HttpError(404, "No projects found to delete");
        }

        await projectRepository.deleteByIds(projects.map(project => String(project._id)))

        projects.forEach(project => {
            deleteImagesFromDisk(project.images)
            deleteVideosFromDisk(project.videos)
        })

        return projects.length
    },

    async getTotalCount() {
        return await projectRepository.getTotalCount()
    }
}
