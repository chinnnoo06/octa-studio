import { Request, Response, NextFunction } from "express";
import { body, query, validationResult } from "express-validator";
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

/** Query comun de los listados del panel: pagina, buscador, rango de fechas y orden. */
export const validateAdminListQuery = async (req: Request, res: Response, next: NextFunction) => {
    await query("page").optional().isInt({ min: 1 }).withMessage("Page must be an integer greater than 0").run(req)
    await query("search").optional().isString().trim().isLength({ max: 100 }).withMessage("Search is too long").run(req)
    await query("from").optional().isISO8601().withMessage("From must be a YYYY-MM-DD date").run(req)
    await query("to").optional().isISO8601().withMessage("To must be a YYYY-MM-DD date").run(req)
    await query("sort").optional().isString().run(req)
    await query("order").optional().isIn(["asc", "desc"]).withMessage("Order must be asc or desc").run(req)

    next()
}

/** Cuerpo del borrado masivo: una lista no vacia de ids de Mongo. */
export const validateBulkDelete = async (req: Request, res: Response, next: NextFunction) => {
    await body("ids").isArray({ min: 1, max: 100 }).withMessage("Ids must be a list of 1 to 100 items").run(req)
    await body("ids.*").isMongoId().withMessage("Invalid Id").run(req)

    next()
}

/** Tope por imagen, el mismo que valida el formulario. */
const IMAGE_MAX_SIZE = 10 * 1024 * 1024;

/** Al crear la imagen es obligatoria; al editar es opcional (`validateOptionalImagesFormat`). */
const checkImagesFormat = (required: boolean) => (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as TMulterFiles | undefined;

    // Every image field is checked, whatever its name (projectImages, blogImage, ...);
    // the video field has its own validator.
    const { projectVideos, ...imageFields } = files ?? {};

    const imagesFiles: Express.Multer.File[] = Object.values(imageFields)
        .flatMap(field => field ?? []);

    if (imagesFiles.length === 0) {
        if (!required) return next();

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

    const oversized = imagesFiles.find(file => file.size > IMAGE_MAX_SIZE);

    if (oversized) {
        deleteAllUploadedFiles(files);

        return res.status(400).json({
            errors: [
                { msg: "One or more images exceed the 10 MB limit." }
            ]
        });
    }

    next();
};

export const validateImagesFormat = checkImagesFormat(true);

/** Edicion: sin imagenes nuevas pasa; si vienen, se validan igual que al crear. */
export const validateOptionalImagesFormat = checkImagesFormat(false);

const ALLOWED_VIDEO_FORMATS = [
    "video/mp4",
    "video/webm"
];

/** Videos del proyecto: opcionales, pero si vienen deben ser MP4 o WebM. */
export const validateVideosFormat = (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as TMulterFiles | undefined;
    const videos = files?.projectVideos ?? [];

    const invalidFile = videos.find(file => !ALLOWED_VIDEO_FORMATS.includes(file.mimetype));

    if (invalidFile) {
        deleteAllUploadedFiles(files);

        return res.status(400).json({
            errors: [
                { msg: "One or more videos have an invalid format, it must be (mp4, webm)." }
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
