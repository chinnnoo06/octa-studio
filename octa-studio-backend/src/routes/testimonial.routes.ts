import { Router } from "express";
import { param, query } from "express-validator";
import { auth } from "../middlewares/auth";
import { handleInputErrors, validateAdminListQuery, validateBulkDelete, validateImagesFormat } from "../middlewares/reqValidation";
import { converToWebP } from "../middlewares/convertToWebp";
import { testimonialsUploads } from "../middlewares/uploads";
import { validateTestimonialExists, validateTestimonialInput } from "../middlewares/testimonial";
import { TestimonialController } from "../controllers/testimonial.controller";

const router: Router = Router();

router.get("/",
    TestimonialController.getTestimonials
)

// Listado del panel: buscador, filtro por valoracion y fechas, orden y paginas.
router.get("/admin",
    auth,
    validateAdminListQuery,
    query('rating').optional({ values: 'falsy' }).isInt({ min: 0, max: 5 }).withMessage('Rating must be an integer between 0 and 5'),
    handleInputErrors,
    TestimonialController.getAdminTestimonials
)

router.post("/bulk-delete",
    auth,
    validateBulkDelete,
    handleInputErrors,
    TestimonialController.deleteTestimonials
)

router.post("/",
    auth,
    testimonialsUploads.fields([
        { name: "testimonialImage", maxCount: 1 }
    ]),
    validateImagesFormat,
    validateTestimonialInput,
    handleInputErrors,
    converToWebP,
    TestimonialController.createTestimonial
)

router.put("/:id",
    auth,
    param('id').isMongoId().withMessage('Invalide Id'),
    validateTestimonialInput,
    handleInputErrors,
    validateTestimonialExists,
    TestimonialController.updateTestimonial
)

router.patch("/:id/image",
    auth,
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateTestimonialExists,
    testimonialsUploads.fields([
        { name: "testimonialImage", maxCount: 1 }
    ]),
    validateImagesFormat,
    converToWebP,
    TestimonialController.updateTestimonialImage
)

router.delete("/:id",
    auth,
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateTestimonialExists,
    TestimonialController.deleteTestimonial
)

router.get("/:id",
    auth,
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateTestimonialExists,
    TestimonialController.getTestimonial
)

export default router;
