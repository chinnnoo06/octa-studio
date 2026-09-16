"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-toastify";

import { TestimonialFormSchema, TTestimonialForm } from '@/schemas/testimonials/testimonials.form.schemas';
import { TestimonialForm } from './TestimonialForm';
import { TTestiomonial } from "@/schemas/testimonials/testimonials.schemas";
import { useTestimonials } from "@/hooks/testimonials/useTestimonials";
import { useEffect } from "react";

export const EditTestimonial = ({ testimonial }: { testimonial: TTestiomonial }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<TTestimonialForm>({
        resolver: zodResolver(TestimonialFormSchema),
        defaultValues: {
            quote: testimonial.quote,
            name: testimonial.name,
            rating: testimonial.rating
        }
    })

    const { updateTestimonial } = useTestimonials();

    useEffect(() => {
        if (updateTestimonial.error) toast.error(updateTestimonial.error);
        if (updateTestimonial.success) toast.success(updateTestimonial.success);
    }, [updateTestimonial.error, updateTestimonial.success]);

    const onSubmit = (data: TTestimonialForm) => updateTestimonial.handleUpdateTestimonial(testimonial._id, data)

    return (
        <TestimonialForm
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            loading={updateTestimonial.loading}
            submitLabel="Guardar cambios"
        />
    )
}
