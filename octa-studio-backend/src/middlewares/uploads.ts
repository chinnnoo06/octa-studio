
import multer from "multer"
import fs from "fs"
import path from "path"

import { UPLOADS_PATH } from "../config/env"

const MB = 1024 * 1024

type TFolder = string | ((file: Express.Multer.File) => string)

const createUploader = (folder: TFolder, maxFileSize?: number) => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = path.resolve(UPLOADS_PATH, typeof folder === "function" ? folder(file) : folder);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            cb(null, dir);
        },

        filename: (req, file, cb) => {
            const timestamp = Date.now();
            const random = Math.round(Math.random() * 1e9);
            const ext = path.extname(file.originalname);

            cb(null, `${timestamp}-${random}${ext}`);
        }
    }),
    limits: maxFileSize ? { fileSize: maxFileSize } : undefined
});

/** Tope por archivo de video. Las fotos no lo alcanzan y ademas se reducen al convertir. */
const VIDEO_MAX_SIZE = 50 * MB

const projectFolder = (file: Express.Multer.File) =>
    file.fieldname === "projectVideos" ? "projects/videos" : "projects"

/** Solo las fotos del proyecto. */
export const projectsUploads = createUploader("projects")

/** Solo los videos del proyecto. */
export const projectVideosUploads = createUploader("projects/videos", VIDEO_MAX_SIZE)

/** Fotos y videos en la misma peticion (alta del proyecto): cada campo a su carpeta. */
export const projectMediaUploads = createUploader(projectFolder, VIDEO_MAX_SIZE)

/** Imagen destacada del blog. */
export const blogsUploads = createUploader("blogs")

/** Imagenes del cuerpo del blog, subidas desde el editor una a una. */
export const blogContentUploads = createUploader("blogs/content", 5 * MB)

/** Logo o foto de la empresa del testimonio. */
export const testimonialsUploads = createUploader("testimonials")
