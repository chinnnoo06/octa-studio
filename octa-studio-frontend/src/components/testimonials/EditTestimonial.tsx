"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-toastify";

import { updateTestimonial } from '@/actions/testimonials/update-testimonial-action';
import { TestimonialFormSchema, TTestimonialForm } from '@/schemas/testimonials/testimonials.form.schemas';
import { useActionStatus } from "@/hooks/ui/useActionStatus";
import { TestimonialForm } from './TestimonialForm';
import { TTestiomonial } from "@/schemas/testimonials/testimonials.schemas";

export const EditTestimonial = ({ testimonial }: {testimonial: TTestiomonial}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<TTestimonialForm>({
        resolver: zodResolver(TestimonialFormSchema),
        defaultValues: {
            quote: testimonial.quote,
            name: testimonial.name,
            rating: testimonial.rating
        }
    })

    const { loading, startLoading, stopLoading } = useActionStatus()

    const submit = async (data: TTestimonialForm) => {
        startLoading()
        const res = await updateTestimonial(testimonial._id, data)
        stopLoading()

        if (res?.error) toast.error(res.error)
        else if (res?.success) toast.success(res.success)
    }

    return (
        <TestimonialForm
            register={register}
            errors={errors}
            onSubmit={handleSubmit(submit)}
            loading={loading}
            submitLabel="Guardar cambios"
        />
    )
}
