import { Router } from "express";
import { param } from "express-validator";
import { auth } from "../middlewares/auth";
import { handleInputErrors, validateBulkDelete } from "../middlewares/reqValidation";
import { validateBlogCategoryExists, validateBlogCategoryInput } from "../middlewares/blogCategory";
import { BlogCategoryController } from "../controllers/BlogCategory.controller";

const router: Router = Router();

router.get("/",
    BlogCategoryController.getCategories
)

router.get("/admin",
    auth,
    BlogCategoryController.getAdminCategories
)

router.post("/bulk-delete",
    auth,
    validateBulkDelete,
    handleInputErrors,
    BlogCategoryController.deleteCategories
)

router.post("/",
    auth,
    validateBlogCategoryInput,
    handleInputErrors,
    BlogCategoryController.createCategory
)

router.patch("/:id",
    auth,
    param('id').isMongoId().withMessage('Invalide Id'),
    validateBlogCategoryInput,
    handleInputErrors,
    validateBlogCategoryExists,
    BlogCategoryController.updateCategory
)

router.delete("/:id",
    auth,
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateBlogCategoryExists,
    BlogCategoryController.deleteCategory
)

router.get("/:id",
    auth,
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateBlogCategoryExists,
    BlogCategoryController.getCategory
)

export default router;
