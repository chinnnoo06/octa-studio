import { Router } from "express";
import { param } from "express-validator";
import { auth } from "../middlewares/auth";
import { handleInputErrors, validateImagesFormat } from "../middlewares/reqValidation";
import { converToWebP } from "../middlewares/convertToWebp";
import { testimonialsUploads } from "../middlewares/uploads";
import { validateTestimonialExists, validateTestimonialInput } from "../middlewares/testimonial";
import { TestimonialController } from "../controllers/testimonial.controller";

const router: Router = Router();

router.get("/",
    TestimonialController.getTestimonials
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
