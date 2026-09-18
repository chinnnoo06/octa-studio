
import multer from "multer"
import fs from "fs"
import path from "path"

import { UPLOADS_PATH } from "../config/env"

const MB = 1024 * 1024

const createUploader = (folder: string, maxFileSize?: number) => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = path.resolve(UPLOADS_PATH, folder);

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

export const projectsUploads = createUploader("projects")

/** Imagen destacada del blog. */
export const blogsUploads = createUploader("blogs")

/** Imagenes del cuerpo del blog, subidas desde el editor una a una. */
export const blogContentUploads = createUploader("blogs/content", 5 * MB)
