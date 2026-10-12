"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFloppyDisk } from 'react-icons/fa6';
import { toast } from "react-toastify";

import { CreateTestimonialFormSchema, TCreateTestimonialForm } from '@/schemas/testimonial/testimonial.form.schemas';
import { useTestimonial } from "@/hooks/useTestimonial";
import { Label } from "@/components/admin/ui/form/Label";
import { Input } from "@/components/admin/ui/form/Input";
import { Textarea } from "@/components/admin/ui/form/Textarea";
import { SpanError } from "@/components/admin/ui/form/SpanError";
import { FormSection } from "@/components/admin/ui/form/FormSection";
import { FormSectionTitle } from "@/components/admin/ui/form/FormSectionTitle";
import { ImageField } from "@/components/admin/ui/form/ImageField";
import { ActionButton } from "@/components/admin/ui/buttons/ActionButton";

export const CreateTestimonialForm = () => {
    const router = useRouter();

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TCreateTestimonialForm>({
        resolver: zodResolver(CreateTestimonialFormSchema),
        defaultValues: { quote: '', name: '', rating: 5, image: undefined }
    })

    const { createTestimonial } = useTestimonial();

    useEffect(() => {
        if (createTestimonial.error) toast.error(createTestimonial.error);
        if (createTestimonial.success) {
            toast.success(createTestimonial.success);
            router.push('/admin/testimonios');
        }
    }, [createTestimonial.error, createTestimonial.success, router]);

    const image = useWatch({ control, name: 'image' });

    const onSubmit = (data: TCreateTestimonialForm) => createTestimonial.handleCreateTestimonial(data)

    return (
        <form id="admin-form" className="mx-auto flex w-full max-w-240 flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                <FaFloppyDisk aria-hidden="true" className="size-4 lg:size-4.5" />
                {createTestimonial.loading ? 'Guardando...' : 'Crear testimonio'}
            </ActionButton>
        </form>
    )
}
