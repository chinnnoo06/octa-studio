import { Router } from "express";
import { auth } from "../middlewares/auth";
import { converToWebP } from "../middlewares/convertToWebp";
import { projectsUploads } from "../middlewares/uploads";
import { handleInputErrors, validateImagesFormat } from "../middlewares/reqValidation";
import { validateProjectExists, validateProjectInput } from "../middlewares/project";
import { ProjectController } from "../controllers/project.controller";
import { param, query } from "express-validator";

const router: Router = Router();

router.get("/",
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be an integer greater than 0'),
    handleInputErrors,
    ProjectController.getProjects
)

router.post("/",
    auth(),
    projectsUploads.fields([
        { name: "projectImages", maxCount: 5 }
    ]),
    validateImagesFormat,
    validateProjectInput,
    handleInputErrors,
    converToWebP,
    ProjectController.createProject
)

router.patch("/:id",
    auth(),
    param('id').isMongoId().withMessage('Invalide Id'),
    validateProjectInput,
    handleInputErrors,
    validateProjectExists,
    ProjectController.updateProject
)

router.patch("/:id/images",
    auth(),
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateProjectExists,
    projectsUploads.fields([
        { name: "projectImages", maxCount: 5 }
    ]),
    validateImagesFormat,
    converToWebP,
    ProjectController.updateProjectImages
)

router.delete("/:id",
    auth(),
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateProjectExists,
    ProjectController.deleteProject
)

router.get("/:id",
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateProjectExists,
    ProjectController.getProject
)

export default router;
