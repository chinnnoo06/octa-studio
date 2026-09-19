"use client"

import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFloppyDisk } from 'react-icons/fa6';
import { toast } from "react-toastify";

import { UpdateTestimonialFormSchema, TUpdateTestimonialForm } from '@/schemas/testimonials/testimonials.form.schemas';
import { TTestiomonial } from "@/schemas/testimonials/testimonials.schemas";
import { useTestimonials } from "@/hooks/testimonials/useTestimonials";
import { Label } from "@/components/ui/form/Label";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { SpanError } from "@/components/ui/form/SpanError";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { ActionButton } from "@/components/ui/buttons/ActionButton";

export const EditTestimonialForm = ({ testimonial }: { testimonial: TTestiomonial }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<TUpdateTestimonialForm>({
        resolver: zodResolver(UpdateTestimonialFormSchema),
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

    const onSubmit = (data: TUpdateTestimonialForm) => updateTestimonial.handleUpdateTestimonial(testimonial._id, data)

    return (
        <form className='space-y-8' onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormSection>
                <FormSectionTitle>Datos del testimonio</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="name">Nombre</Label>
                    <Input type="text" id="name" placeholder="Quién lo dice" {...register("name")} />
                    <SpanError message={errors.name?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="quote">Testimonio</Label>
                    <Textarea
                        id="quote"
                        rows={4}
                        placeholder="Escribe el testimonio tal como lo dio el cliente"
                        {...register("quote")}
                    />
                    <SpanError message={errors.quote?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="rating">Valoración (de 0 a 5)</Label>
                    <Input type="number" id="rating" min={0} max={5} step={1} {...register("rating", { valueAsNumber: true })} />
                    <SpanError message={errors.rating?.message} />
                </div>
            </FormSection>

            <ActionButton loading={updateTestimonial.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                {updateTestimonial.loading ? 'Guardando...' : 'Guardar cambios'}
            </ActionButton>
        </form>
    )
}
