"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFloppyDisk } from 'react-icons/fa6';
import { toast } from "react-toastify";

import { UpdateTestimonialFormSchema, TUpdateTestimonialForm } from '@/schemas/testimonial/testimonial.form.schemas';
import { TTestimonial } from "@/schemas/testimonial/testimonial.schemas";
import { useTestimonial } from "@/hooks/useTestimonial";
import { Label } from "@/components/ui/form/Label";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { SpanError } from "@/components/ui/form/SpanError";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { ImageField } from "@/components/ui/form/ImageField";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { ADMIN_FORM_ID } from "@/components/ui/buttons/FormSubmitButton";

export const EditTestimonialForm = ({ testimonial }: { testimonial: TTestimonial }) => {
    const router = useRouter();

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TUpdateTestimonialForm>({
        resolver: zodResolver(UpdateTestimonialFormSchema),
        defaultValues: {
            quote: testimonial.quote,
            name: testimonial.name,
            rating: testimonial.rating,
            image: undefined
        }
    })

    const { updateTestimonial } = useTestimonial();

    useEffect(() => {
        if (updateTestimonial.error) toast.error(updateTestimonial.error);
        if (updateTestimonial.success) {
            toast.success(updateTestimonial.success);
            router.push('/admin/testimonios');
        }
    }, [updateTestimonial.error, updateTestimonial.success, router]);

    const image = useWatch({ control, name: 'image' });

    const onSubmit = (data: TUpdateTestimonialForm) => updateTestimonial.handleUpdateTestimonial(testimonial._id, data)

    return (
        <form id={ADMIN_FORM_ID} className="mx-auto flex w-full max-w-240 flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    onChange={(file) => setValue('image', file ?? undefined, { shouldValidate: true })}
                    error={errors.image?.message}
                    label="Logo o foto de la empresa"
                    currentUrl={`${process.env.NEXT_PUBLIC_TESTIMONIALS_IMAGE_URL}/${testimonial.image}`}
                    hint="Pulsa la imagen para cambiarla."
                />
            </FormSection>

            <ActionButton loading={updateTestimonial.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="size-4 lg:size-4.5" />
                {updateTestimonial.loading ? 'Guardando...' : 'Guardar cambios'}
            </ActionButton>
        </form>
    )
}
