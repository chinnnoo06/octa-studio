"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-toastify";

import { TestimonialFormSchema, TTestimonialForm } from '@/schemas/testimonials/testimonials.form.schemas';
import { useActionStatus } from "@/hooks/ui/useActionStatus";
import { TestimonialForm } from './TestimonialForm';
import { createTestimonial } from "@/actions/testimonials/create-testimonial-action";

export const CreateTestimonial = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TTestimonialForm>({
        resolver: zodResolver(TestimonialFormSchema),
        defaultValues: { quote: '', name: '', rating: 5 }
    })

    const { loading, startLoading, stopLoading } = useActionStatus()

    const submit = async (data: TTestimonialForm) => {
        startLoading()
        const res = await createTestimonial(data)
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
            submitLabel="Crear testimonio"
        />
    )
}
