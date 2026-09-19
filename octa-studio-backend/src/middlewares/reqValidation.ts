import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { TMulterFiles } from "../types/multer/multer.types";
import { deleteAllUploadedFiles } from "../utils/deleteFiles";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    let errors = validationResult(req)

    if (!errors.isEmpty()) {

        const files = req.files as TMulterFiles | undefined;

        if (files) {
            deleteAllUploadedFiles(files)
        }

        return res.status(400).json({ errors: errors.array() })
    }

    next()
}

export const validateImagesFormat = (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as TMulterFiles | undefined;

    // Every upload field is checked, whatever its name (projectImages, blogImages, ...)
    const imagesFiles: Express.Multer.File[] = Object.values(files ?? {})
        .flatMap(field => field ?? []);

    if (imagesFiles.length === 0) {
        deleteAllUploadedFiles(files);

        return res.status(400).json({
            errors: [
                { msg: "At least one image is required" }
            ]
        });
    }

    const allowedFormats = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    const invalidFile = imagesFiles.find(file =>
        !allowedFormats.includes(file.mimetype)
    );

    if (invalidFile) {
        deleteAllUploadedFiles(files);

        return res.status(400).json({
            errors: [
                { msg: "One or more files have an invalid format, it must be (jpeg, jpg, png, webp)." }
            ]
        });
    }

    next();
};

// In multipart/form-data every field arrives as a string, so the structured
// ones have to be parsed before they can be validated
export const parseJsonFields = (fields: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            fields.forEach(field => {
                const value = req.body[field]

                if (typeof value === "string") {
                    req.body[field] = JSON.parse(value)
                }
            })

            next()
        } catch (error) {
            deleteAllUploadedFiles(req.files as TMulterFiles | undefined);

            return res.status(400).json({
                errors: [
                    { msg: `These fields must be valid JSON: ${fields.join(", ")}` }
                ]
            });
        }
    }
}
