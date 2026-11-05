import path from "path";

import { TestimonialRepository } from "../repositories/Testimonial.repository";
import { TMulterFiles } from "../types/multer/multer.types";
import { TGetAdminTestimonialsQuery, TTestimonialDto } from "../types/testimonial/testimonial.dtos";
import { TTestimonialDocument } from "../types/testimonial/testimonial.types";
import { deleteAllUploadedFiles, deleteFilesByName } from "../utils/deleteFiles";
import { HttpError } from "../utils/error";
import { toPagination } from "../utils/listQuery";
import { UPLOADS_PATH } from "../config/env";

const ADMIN_TESTIMONIALS_PER_PAGE = 10;

const imagesDir = path.resolve(UPLOADS_PATH, "testimonials");

export class TestimonialService {

    static async getAdminTestimonials(query: TGetAdminTestimonialsQuery) {
        const result = await TestimonialRepository.findAdminPaginated(query, ADMIN_TESTIMONIALS_PER_PAGE)

        return {
            testimonials: result.docs,
            pagination: toPagination(result)
        }
    }

    /** Borrado masivo del panel: cada testimonio se lleva su logo. */
    static async deleteTestimonials(ids: string[]) {
        const testimonials = await TestimonialRepository.findByIds(ids)

        if (testimonials.length === 0) {
            throw new HttpError(404, "No testimonials found to delete");
        }

        await TestimonialRepository.deleteByIds(testimonials.map(testimonial => String(testimonial._id)))

        testimonials.forEach(testimonial => deleteFilesByName(imagesDir, [testimonial.image]))

        return testimonials.length
    }

    static async getTestimonials() {
        return await TestimonialRepository.findAll()
    }

    static async createTestimonial(data: TTestimonialDto, files: TMulterFiles) {
        try {
            const image = files.testimonialImage?.[0]?.filename

            if (!image) {
                throw new HttpError(400, "A company image is required for the testimonial");
            }

            await TestimonialRepository.createTestimonial({
                ...data,
                image
            })

        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    }

    static async updateTestimonial(testimonial: TTestimonialDocument, data: TTestimonialDto, files?: TMulterFiles) {
        try {
            const newImage = files?.testimonialImage?.[0]?.filename
            const oldImage = testimonial.image

            testimonial.quote = data.quote
            testimonial.name = data.name
            testimonial.rating = data.rating
            if (newImage) testimonial.image = newImage

            await testimonial.save()

            if (newImage) deleteFilesByName(imagesDir, [oldImage])
        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    }

    static async deleteTestimonial(testimonial: TTestimonialDocument) {
        await testimonial.deleteOne()

        deleteFilesByName(imagesDir, [testimonial.image])
    }
}
