import fs from "fs";
import path from "path";
import mongoose from "mongoose";

import { UPLOADS_PATH } from "../config/env";
import { blogRepository } from "../repositories/blog.repository";
import { extractContentImages } from "../utils/blogContent";

const contentImagesDir = path.resolve(UPLOADS_PATH, "blogs", "content");

const EVERY_24_HOURS = 24 * 60 * 60 * 1000;

const MIN_AGE = 24 * 60 * 60 * 1000;

export const cleanOrphanContentImages = async () => {
    if (!fs.existsSync(contentImagesDir)) return;

    const blogs = await blogRepository.findAllContent();

    const referenced = new Set(blogs.flatMap(blog => extractContentImages(blog.content)));

    const now = Date.now();
    let deleted = 0;

    for (const name of fs.readdirSync(contentImagesDir)) {
        if (referenced.has(name)) continue;

        const filePath = path.join(contentImagesDir, name);
        const { mtimeMs } = fs.statSync(filePath);

        if (now - mtimeMs < MIN_AGE) continue;

        try {
            fs.unlinkSync(filePath);
            deleted++;
        } catch (error) {
            console.error(`[jobs] No se pudo borrar ${name}`, error);
        }
    }

    console.log(`[jobs] Imagenes de contenido huerfanas borradas: ${deleted}`);
};

export const scheduleOrphanContentImagesCleanup = () => {
    const run = () => cleanOrphanContentImages().catch(error => console.error("[jobs] Error limpiando imagenes huerfanas", error));

    if (mongoose.connection.readyState === 1) run();
    else mongoose.connection.once("open", run);

    setInterval(run, EVERY_24_HOURS).unref();
};
