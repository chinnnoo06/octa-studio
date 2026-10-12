import fs from "fs";
import path from "path";

import { testimonialRepository } from "../repositories/testimonial.repository";
import { TMulterFiles } from "../types/multer/multer.types";
import { TGetAdminTestimonialsQuery, TTestimonialDto } from "../types/testimonial/testimonial.dtos";
import { TTestimonialDocument } from "../types/testimonial/testimonial.types";
import { deleteAllUploadedFiles } from "../utils/deleteFiles";
import { HttpError } from "../utils/error";
import { buildSort, dateRangeFilter, searchFilter, toPagination } from "../utils/listQuery";
import { UPLOADS_PATH } from "../config/env";

const ADMIN_TESTIMONIALS_PER_PAGE = 10;

const ADMIN_SORTABLE = ["name", "rating", "createdAt"];

const imagesDir = path.resolve(UPLOADS_PATH, "testimonials");

const deleteImageFromDisk = (name: string) => {
    const filePath = path.join(imagesDir, name)

    try {
        fs.unlinkSync(filePath)
        console.log(`Image deleted: ${name}`);
    } catch (err) {
        console.error(`Error deleting ${name}`)
    }
}

export const TestimonialService = {

    async getAdminTestimonials({ page, search, rating, from, to, sort, order }: TGetAdminTestimonialsQuery) {
        const filter = {
            ...searchFilter(search, ["name", "quote"]),
            ...(rating !== undefined && rating !== "" ? { rating: Number(rating) } : {}),
            ...dateRangeFilter(from, to)
        }

        const result = await testimonialRepository.findPaginated(
            Number(page ?? 1),
            ADMIN_TESTIMONIALS_PER_PAGE,
            filter,
            buildSort(sort, order, ADMIN_SORTABLE)
        )

        return {
            testimonials: result.docs,
            pagination: toPagination(result)
        }
    },

    /** Borrado masivo del panel: cada testimonio se lleva su logo. */
    async deleteTestimonials(ids: string[]) {
        const testimonials = await testimonialRepository.findByIds(ids)

        if (testimonials.length === 0) {
            throw new HttpError(404, "No testimonials found to delete");
        }

        await testimonialRepository.deleteByIds(testimonials.map(testimonial => String(testimonial._id)))

        testimonials.forEach(testimonial => deleteImageFromDisk(testimonial.image))

        return testimonials.length
    },

    async getTestimonials() {
        return await testimonialRepository.findAll()
    },

    async createTestimonial(data: TTestimonialDto, files?: TMulterFiles) {
        try {
            const image = files?.testimonialImage?.[0]?.filename

            if (!image) {
                throw new HttpError(400, "A company image is required for the testimonial");
            }

            await testimonialRepository.createTestimonial({
                ...data,
                image
            })

        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    },

    /** Edita los datos y, si llega, reemplaza el logo (el anterior se borra al guardar). */
    async updateTestimonial(testimonial: TTestimonialDocument, data: TTestimonialDto, files?: TMulterFiles) {
        try {
            const newImage = files?.testimonialImage?.[0]?.filename
            const oldImage = testimonial.image

            testimonial.quote = data.quote
            testimonial.name = data.name
            testimonial.rating = data.rating
            if (newImage) testimonial.image = newImage

            await testimonial.save()

            if (newImage) deleteImageFromDisk(oldImage)
        } catch (error) {
            deleteAllUploadedFiles(files);
            throw error
        }
    },

    async deleteTestimonial(testimonial: TTestimonialDocument) {
        await testimonial.deleteOne()

        deleteImageFromDisk(testimonial.image)
    }
}
