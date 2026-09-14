
import multer from "multer"
import fs from "fs"
import path from "path"

import { UPLOADS_PATH } from "../config/env"

const createUploader = (folder: string) => multer({
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
    })
});

export const projectsUploads = createUploader("projects")

export const blogsUploads = createUploader("blogs")
