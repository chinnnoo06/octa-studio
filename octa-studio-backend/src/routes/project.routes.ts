import { Router } from "express";
import { auth } from "../middlewares/auth";
import { converToWebP } from "../middlewares/convertToWebp";
import { projectMediaUploads } from "../middlewares/uploads";
import { handleInputErrors, parseJsonFields, validateAdminListQuery, validateBulkDelete, validateImagesFormat, validateOptionalImagesFormat, validateVideosFormat } from "../middlewares/reqValidation";
import { validateProjectExists, validateProjectExistsBySlug, validateProjectInput } from "../middlewares/project";
import { ProjectController } from "../controllers/project.controller";
import { param, query } from "express-validator";

const router: Router = Router();

router.get("/",
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be an integer greater than 0'),
    handleInputErrors,
    ProjectController.getProjects
)

// Listado del panel: buscador, filtro por sector y fechas, y orden por columna.
router.get("/admin",
    auth,
    validateAdminListQuery,
    query('sector').optional().isString().trim(),
    handleInputErrors,
    ProjectController.getAdminProjects
)

router.get("/count",
    auth,
    ProjectController.getProjectsCount
)

router.post("/bulk-delete",
    auth,
    validateBulkDelete,
    handleInputErrors,
    ProjectController.deleteProjects
)

router.post("/",
    auth,
    projectMediaUploads.fields([
        { name: "projectImages", maxCount: 5 },
        { name: "projectVideos", maxCount: 5 }
    ]),
    parseJsonFields(["seo"]),
    validateImagesFormat,
    validateVideosFormat,
    validateProjectInput,
    handleInputErrors,
    converToWebP,
    ProjectController.createProject
)

// Edicion completa en una sola peticion: datos, SEO, fotos y videos
// (los que se conservan van en keepImages/keepVideos; los nuevos, como archivos).
router.patch("/:id",
    auth,
    projectMediaUploads.fields([
        { name: "projectImages", maxCount: 5 },
        { name: "projectVideos", maxCount: 5 }
    ]),
    parseJsonFields(["seo", "keepImages", "keepVideos"]),
    param('id').isMongoId().withMessage('Invalide Id'),
    validateOptionalImagesFormat,
    validateVideosFormat,
    validateProjectInput,
    handleInputErrors,
    validateProjectExists,
    converToWebP,
    ProjectController.updateProject
)

router.delete("/:id",
    auth,
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateProjectExists,
    ProjectController.deleteProject
)

router.get("/id/:id",
    auth,
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateProjectExists,
    ProjectController.getProject
)

router.get("/:slug",
    param('slug').notEmpty().withMessage('Slug is required'),
    handleInputErrors,
    validateProjectExistsBySlug,
    ProjectController.getProject
)

export default router;
