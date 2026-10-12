import { Router } from "express";
import { param, query } from "express-validator";
import { auth } from "../middlewares/auth";
import { handleInputErrors, validateAdminListQuery, validateBulkDelete, validateImagesFormat, validateOptionalImagesFormat } from "../middlewares/reqValidation";
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

// Edicion completa en una sola peticion: datos y, opcional, el logo de la empresa.
router.put("/:id",
    auth,
    testimonialsUploads.fields([
        { name: "testimonialImage", maxCount: 1 }
    ]),
    param('id').isMongoId().withMessage('Invalide Id'),
    validateOptionalImagesFormat,
    validateTestimonialInput,
    handleInputErrors,
    validateTestimonialExists,
    converToWebP,
    TestimonialController.updateTestimonial
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
