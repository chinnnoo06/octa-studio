import { Request, Response, NextFunction } from "express";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import { TMulterFiles } from "../types/multer/multer.types";
import { deleteSingleUploadedFile } from "../utils/deleteFiles";

type TConverterOptions = {
    /** Si se indica, las imagenes mas anchas se reducen a este ancho. */
    maxWidth?: number
}

/**
 * Convierte a WebP todo lo que subio multer, en el sitio. Con `maxWidth`
 * ademas reescala las que se pasen, sin agrandar las pequenas.
 */
export const createWebPConverter = ({ maxWidth }: TConverterOptions = {}) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const filesObj = req.files as TMulterFiles | undefined;

            if (!filesObj) return next();

            const filesToProcess: Express.Multer.File[] = Object.values(filesObj)
                .flatMap(field => field ?? []);

            if (filesToProcess.length === 0) return next();

            for (const file of filesToProcess) {
                const ext = path.extname(file.path).toLowerCase();

                // Un WebP sin reescalado no necesita pasar por sharp.
                if (ext === ".webp" && !maxWidth) {
                    console.log(`Skipping conversion, file is already WebP: ${file.filename}`);
                    continue;
                }

                // Si ya es WebP se escribe a un temporal y se sustituye, porque
                // sharp no puede leer y escribir el mismo archivo.
                const outputPath = ext === ".webp"
                    ? file.path.replace(/\.webp$/, ".tmp.webp")
                    : file.path.replace(path.extname(file.path), ".webp");

                let converted = false;
                let attempts = 0;
                const maxAttempts = 3;

                while (!converted && attempts < maxAttempts) {
                    try {
                        attempts++;

                        // Se lee a memoria para que sharp no mantenga el archivo
                        // abierto: en Windows eso bloquea el unlink y el rename.
                        let pipeline = sharp(fs.readFileSync(file.path)).rotate();
                        if (maxWidth) pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
                        await pipeline.webp({ quality: 80 }).toFile(outputPath);

                        // Delete the original file if it exists
                        try {
                            if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
                        } catch (unlinkErr) {
                            console.warn(`⚠ Could not delete the original file:`, unlinkErr);
                        }

                        const finalPath = outputPath.replace(/\.tmp\.webp$/, ".webp");
                        if (finalPath !== outputPath) fs.renameSync(outputPath, finalPath);

                        // Update req.file to point to the new file
                        file.path = finalPath;
                        file.filename = path.basename(finalPath);

                        console.log(`Converted to WebP: ${file.filename} (Attempt ${attempts})`);
                        converted = true;

                    } catch (err) {
                        console.warn(
                            `Error converting ${file.filename} to WebP (Attempt ${attempts}):`,
                            err
                        );

                        if (attempts >= maxAttempts) {
                            deleteSingleUploadedFile(file)
                            return res.status(500).json({
                                status: "error",
                                message: `Could not convert the image ${file.filename}. Please try again.`,
                            });
                        }
                    }
                }
            }

            next();
        } catch (err) {
            console.error("Unexpected error during WebP conversion:", err);
            return res.status(500).json({
                status: "error",
                message: "Unexpected error while processing the images. Please try again."
            });
        }
    };

/** El de siempre: proyectos y la imagen destacada del blog, a tamano original. */
export const converToWebP = createWebPConverter();

/** Imagenes del cuerpo del blog: ademas se limitan a 1600 px de ancho. */
export const convertContentImageToWebP = createWebPConverter({ maxWidth: 1600 });
