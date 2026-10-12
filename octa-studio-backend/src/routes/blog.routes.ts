import { Router } from "express";
import { param, query } from "express-validator";
import { BlogStatus } from "../types/blog/blog.types";
import { auth } from "../middlewares/auth";
import { converToWebP, convertContentImageToWebP } from "../middlewares/convertToWebp";
import { blogContentUploads, blogsUploads } from "../middlewares/uploads";
import { handleInputErrors, parseJsonFields, validateAdminListQuery, validateBulkDelete, validateImagesFormat, validateOptionalImagesFormat } from "../middlewares/reqValidation";
import { validateBlogExists, validateBlogExistsBySlug, validateBlogInput } from "../middlewares/blog";
import { BlogController } from "../controllers/blog.controller";

const router: Router = Router();

router.get("/",
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be an integer greater than 0'),
    query('category').optional().isString().trim().isLength({ max: 120 }).withMessage('Invalid category'),
    handleInputErrors,
    BlogController.getBlogs
)

// Listado del panel: incluye borradores y acepta buscador, filtros y orden.
router.get("/admin",
    auth,
    validateAdminListQuery,
    query('category').optional({ values: 'falsy' }).isMongoId().withMessage('Invalid category'),
    query('status').optional().isIn(Object.values(BlogStatus)).withMessage('Invalid status'),
    handleInputErrors,
    BlogController.getAdminBlogs
)

router.get("/stats",
    auth,
    BlogController.getBlogStats
)

router.post("/bulk-delete",
    auth,
    validateBulkDelete,
    handleInputErrors,
    BlogController.deleteBlogs
)

// Publica: la llama la ficha del articulo una vez por sesion de navegador.
router.post("/:slug/views",
    param('slug').notEmpty().withMessage('Slug is required'),
    handleInputErrors,
    BlogController.registerView
)

router.post("/",
    auth,
    blogsUploads.fields([
        { name: "blogImage", maxCount: 1 }
    ]),
    parseJsonFields(["seo"]),
    validateImagesFormat,
    validateBlogInput,
    handleInputErrors,
    converToWebP,
    BlogController.createBlog
)

router.post("/content-images",
    auth,
    blogContentUploads.fields([
        { name: "blogContentImage", maxCount: 1 }
    ]),
    validateImagesFormat,
    convertContentImageToWebP,
    BlogController.uploadContentImage
)

// Edicion completa en una sola peticion: datos, SEO y, opcional, la imagen destacada.
router.patch("/:id",
    auth,
    blogsUploads.fields([
        { name: "blogImage", maxCount: 1 }
    ]),
    parseJsonFields(["seo"]),
    param('id').isMongoId().withMessage('Invalide Id'),
    validateOptionalImagesFormat,
    validateBlogInput,
    handleInputErrors,
    validateBlogExists,
    converToWebP,
    BlogController.updateBlog
)

router.delete("/:id",
    auth,
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateBlogExists,
    BlogController.deleteBlog
)

router.get("/id/:id",
    auth,
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateBlogExists,
    BlogController.getBlog
)

router.get("/:slug",
    param('slug').notEmpty().withMessage('Slug is required'),
    handleInputErrors,
    validateBlogExistsBySlug,
    BlogController.getBlog
)

export default router;
