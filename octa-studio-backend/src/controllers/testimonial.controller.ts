import type { NextFunction, Request, Response } from "express";
import { TMulterFiles } from "../types/multer/multer.types";
import { TBulkDeleteDto, TMongoIdParams } from "../types/common/common.dtos";
import { TRequestWithTestimonial } from "../types/express/testimonial";
import { TGetAdminTestimonialsQuery, TTestimonialDto } from "../types/testimonial/testimonial.dtos";
import { TestimonialService } from "../services/testimonial.service";

export class TestimonialController {

    static getAdminTestimonials = async (req: Request<{}, {}, {}, TGetAdminTestimonialsQuery>, res: Response, next: NextFunction) => {
        try {
            const { testimonials, pagination } = await TestimonialService.getAdminTestimonials(req.query)

            return res.status(200).json({
                status: "success",
                testimonials,
                pagination
            });

        } catch (error) {
            console.error("Error retrieving the admin testimonials:", error);
            next(error)
        }
    }

    static deleteTestimonials = async (req: Request<{}, {}, TBulkDeleteDto>, res: Response, next: NextFunction) => {
        try {
            const deleted = await TestimonialService.deleteTestimonials(req.body.ids)

            return res.status(200).json({
                status: "success",
                message: `${deleted} testimonial(s) deleted successfully`
            });

        } catch (error) {
            console.error("Error deleting the testimonials:", error);
            next(error)
        }
    }

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
        const files = req.files as TMulterFiles;

        try {
            await TestimonialService.createTestimonial(data, files)

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
        const files = req.files as TMulterFiles

        try {
            await TestimonialService.updateTestimonial(req.Testimonial, data, files)

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
