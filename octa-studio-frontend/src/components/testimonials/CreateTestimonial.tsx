"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-toastify";

import { TestimonialFormSchema, TTestimonialForm } from '@/schemas/testimonials/testimonials.form.schemas';
import { TestimonialForm } from './TestimonialForm';
import { useTestimonials } from "@/hooks/testimonials/useTestimonials";
import { useEffect } from "react";

export const CreateTestimonial = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TTestimonialForm>({
        resolver: zodResolver(TestimonialFormSchema),
        defaultValues: { quote: '', name: '', rating: 5 }
    })

    const { createTestimonial } = useTestimonials();

    useEffect(() => {
        if (createTestimonial.error) toast.error(createTestimonial.error);
        if (createTestimonial.success) toast.success(createTestimonial.success);
    }, [createTestimonial.error, createTestimonial.success]);

    const onSubmit = (data: TTestimonialForm) => createTestimonial.handleCreateTestimonial(data)

    return (
        <TestimonialForm
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            loading={createTestimonial.loading}
            submitLabel="Crear testimonio"
        />
    )
}
