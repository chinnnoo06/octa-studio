import { Router } from "express";
import { param, query } from "express-validator";
import { BlogCategory } from "../types/blog/blog.types";
import { auth } from "../middlewares/auth";
import { converToWebP } from "../middlewares/convertToWebp";
import { blogsUploads } from "../middlewares/uploads";
import { handleInputErrors, validateImagesFormat } from "../middlewares/reqValidation";
import { parseBlogJsonFields, validateBlogExists, validateBlogExistsBySlug, validateBlogInput } from "../middlewares/blog";
import { BlogController } from "../controllers/blog.controller";

const router: Router = Router();

router.get("/",
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be an integer greater than 0'),
    query('category').optional().isIn(Object.values(BlogCategory)).withMessage('Invalid category'),
    handleInputErrors,
    BlogController.getBlogs
)

router.post("/",
    auth(),
    blogsUploads.fields([
        { name: "blogImages", maxCount: 5 }
    ]),
    parseBlogJsonFields,
    validateImagesFormat,
    validateBlogInput,
    handleInputErrors,
    converToWebP,
    BlogController.createBlog
)

router.patch("/:id",
    auth(),
    param('id').isMongoId().withMessage('Invalide Id'),
    validateBlogInput,
    handleInputErrors,
    validateBlogExists,
    BlogController.updateBlog
)

router.patch("/:id/images",
    auth(),
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateBlogExists,
    blogsUploads.fields([
        { name: "blogImages", maxCount: 5 }
    ]),
    validateImagesFormat,
    converToWebP,
    BlogController.updateBlogImages
)

router.delete("/:id",
    auth(),
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateBlogExists,
    BlogController.deleteBlog
)

router.get("/:slug",
    param('slug').notEmpty().withMessage('Slug is required'),
    handleInputErrors,
    validateBlogExistsBySlug,
    BlogController.getBlog
)

export default router;
