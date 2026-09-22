"use client"

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFloppyDisk } from 'react-icons/fa6';
import { toast } from "react-toastify";

import { CreateTestimonialFormSchema, TCreateTestimonialForm } from '@/schemas/testimonials/testimonials.form.schemas';
import { useTestimonials } from "@/hooks/testimonials/useTestimonials";
import { Label } from "@/components/ui/form/Label";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { SpanError } from "@/components/ui/form/SpanError";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { ImageField } from "@/components/ui/form/ImageField";
import { ActionButton } from "@/components/ui/buttons/ActionButton";

export const CreateTestimonialForm = () => {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TCreateTestimonialForm>({
        resolver: zodResolver(CreateTestimonialFormSchema),
        defaultValues: { quote: '', name: '', rating: 5, image: undefined }
    })

    const { createTestimonial } = useTestimonials();

    useEffect(() => {
        if (createTestimonial.error) toast.error(createTestimonial.error);
        if (createTestimonial.success) toast.success(createTestimonial.success);
    }, [createTestimonial.error, createTestimonial.success]);

    const image = useWatch({ control, name: 'image' });

    const onSubmit = (data: TCreateTestimonialForm) => createTestimonial.handleCreateTestimonial(data)

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

            <FormSection>
                <FormSectionTitle>Imagen de la empresa</FormSectionTitle>

                <ImageField
                    image={image ?? null}
                    onChange={(file) => setValue('image', file as File, { shouldValidate: true })}
                    error={errors.image?.message}
                    label="Logo o foto de la empresa"
                />
            </FormSection>

            <ActionButton loading={createTestimonial.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                {createTestimonial.loading ? 'Guardando...' : 'Crear testimonio'}
            </ActionButton>
        </form>
    )
}
