import { Router } from "express";
import { param } from "express-validator";
import { auth } from "../middlewares/auth";
import { handleInputErrors } from "../middlewares/reqValidation";
import { validateTestimonialExists, validateTestimonialInput } from "../middlewares/testimonial";
import { TestimonialController } from "../controllers/testimonial.controller";

const router: Router = Router();

router.get("/",
    TestimonialController.getTestimonials
)

router.post("/",
    auth(),
    validateTestimonialInput,
    handleInputErrors,
    TestimonialController.createTestimonial
)

router.patch("/:id",
    auth(),
    param('id').isMongoId().withMessage('Invalide Id'),
    validateTestimonialInput,
    handleInputErrors,
    validateTestimonialExists,
    TestimonialController.updateTestimonial
)

router.delete("/:id",
    auth(),
    param('id').isMongoId().withMessage('Invalide Id'),
    handleInputErrors,
    validateTestimonialExists,
    TestimonialController.deleteTestimonial
)

export default router;
