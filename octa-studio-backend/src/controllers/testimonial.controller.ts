import type { NextFunction, Request, Response } from "express";
import { TMongoIdParams } from "../types/common/common.dtos";
import { TRequestWithTestimonial } from "../types/express/testimonial";
import { TTestimonialDto } from "../types/testimonial/testimonial.dtos";
import { TestimonialService } from "../services/testimonial.service";

export class TestimonialController {

    static getTestimonials = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const testimonials = await TestimonialService.getTestimonials()

            return res.status(200).json({
                status: "success",
                testimonials
            });

        } catch (error) {
            console.error("Error retrieving the testimonials:", error);
            next(error)
        }
    }

    static getTestimonial = async (req: TRequestWithTestimonial<TMongoIdParams>, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json({
                status: "success",
                testimonial: req.Testimonial
            });

        } catch (error) {
            console.error("Error retrieving the testimonial:", error);
            next(error)
        }
    }

    static createTestimonial = async (req: Request<{}, {}, TTestimonialDto>, res: Response, next: NextFunction) => {
        const data = req.body;

        try {
            await TestimonialService.createTestimonial(data)

            return res.status(201).json({
                status: "success",
                message: "Testimonial created successfully"
            });

        } catch (error) {
            console.error("Error creating the testimonial:", error);
            next(error)
        }
    }

    static updateTestimonial = async (req: TRequestWithTestimonial<TMongoIdParams, {}, TTestimonialDto>, res: Response, next: NextFunction) => {
        const data = req.body

        try {
            await TestimonialService.updateTestimonial(req.Testimonial, data)

            return res.status(200).json({
                status: "success",
                message: "Testimonial updated successfully"
            });

        } catch (error) {
            console.error("Error updating the testimonial:", error);
            next(error)
        }
    }

    static deleteTestimonial = async (req: TRequestWithTestimonial<TMongoIdParams>, res: Response, next: NextFunction) => {
        try {
            await TestimonialService.deleteTestimonial(req.Testimonial)

            return res.status(200).json({
                status: "success",
                message: "Testimonial deleted successfully"
            });

        } catch (error) {
            console.error("Error deleting the testimonial:", error);
            next(error)
        }
    }
}
