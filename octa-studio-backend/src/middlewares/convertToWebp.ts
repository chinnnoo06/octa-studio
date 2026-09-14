import { Request, Response, NextFunction } from "express";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import { TMulterFiles } from "../types/multer/multer.types";
import { deleteSingleUploadedFile } from "../utils/deleteFiles";

export const converToWebP = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filesObj = req.files as TMulterFiles | undefined;

        if (!filesObj) return next();

        const filesToProcess: Express.Multer.File[] = Object.values(filesObj)
            .flatMap(field => field ?? []);

        if (filesToProcess.length === 0) return next();

        for (const file of filesToProcess) {
            const ext = path.extname(file.path).toLowerCase();

            // Skip if it is already WebP
            if (ext === ".webp") {
                console.log(`Skipping conversion, file is already WebP: ${file.filename}`);
                continue;
            }

            const outputPath = file.path.replace(path.extname(file.path), ".webp");

            let converted = false;
            let attempts = 0;
            const maxAttempts = 3;

            while (!converted && attempts < maxAttempts) {
                try {
                    attempts++;

                    await sharp(file.path)
                        .rotate()
                        .webp({ quality: 80 })
                        .toFile(outputPath);

                    // Delete the original file if it exists
                    try {
                        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
                    } catch (unlinkErr) {
                        console.warn(`⚠ Could not delete the original file:`, unlinkErr);
                    }

                    // Update req.file to point to the new file
                    file.path = outputPath;
                    file.filename = path.basename(outputPath);

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