import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { TTestimonialDocument } from "../types/testimonial/testimonial.types";
import { HttpError } from "../utils/error";
import { TMongoIdParams } from "../types/common/common.dtos";
import { testimonialRepository } from "../repositories/testimonial.repository";

declare global {
    namespace Express {
        interface Request {
            Testimonial?: TTestimonialDocument
        }
    }
}

export const validateTestimonialInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("quote").notEmpty().withMessage("Quote is required").run(req)
    await body("name").notEmpty().withMessage("Name is required").run(req)
    await body("rating").isInt({ min: 0, max: 5 }).withMessage("Rating must be an integer between 0 and 5").toInt().run(req)

    next()
}

export const validateTestimonialExists = async (req: Request<TMongoIdParams>, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const Testimonial = await testimonialRepository.findById(id)

        if (!Testimonial) {
            throw new HttpError(404, "Testimonial not found")
        }

        req.Testimonial = Testimonial

        next()
    } catch (error) {
        next(error)
    }
}
