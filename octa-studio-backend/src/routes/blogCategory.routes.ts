import { Router } from "express";
import { param } from "express-validator";
import { auth } from "../middlewares/auth";
import { handleInputErrors, validateBulkDelete } from "../middlewares/reqValidation";
import { validateBlogCategoryExists, validateBlogCategoryInput } from "../middlewares/blogCategory";
import { BlogCategoryController } from "../controllers/blogCategory.controller";

const router: Router = Router();

// Publica: el filtro de categorias del blog.
router.get("/",
    BlogCategoryController.getCategories
)

// Panel: con el numero de entradas de cada categoria.
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

router.put("/:id",
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
