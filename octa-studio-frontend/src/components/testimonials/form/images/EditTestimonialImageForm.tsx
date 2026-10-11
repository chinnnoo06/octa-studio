"use client"

import { useEffect, useState } from "react";
import { FaFloppyDisk } from 'react-icons/fa6';
import { FiAlertTriangle } from 'react-icons/fi';
import { toast } from "react-toastify";

import { UpdateTestimonialImageFormSchema } from '@/schemas/testimonial/testimonial.form.schemas';
import { TTestimonial } from "@/schemas/testimonial/testimonial.schemas";
import { useTestimonial } from "@/hooks/useTestimonial";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { ADMIN_FORM_ID } from "@/components/ui/buttons/FormSubmitButton";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { ImageField } from "@/components/ui/form/ImageField";
import { CurrentTestimonialImage } from "./CurrentTestimonialImage";

export const EditTestimonialImageForm = ({ testimonial }: { testimonial: TTestimonial }) => {
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string>();

    const { updateTestimonialImage } = useTestimonial();

    useEffect(() => {
        if (updateTestimonialImage.error) toast.error(updateTestimonialImage.error);
        if (updateTestimonialImage.success) toast.success(updateTestimonialImage.success);
    }, [updateTestimonialImage.error, updateTestimonialImage.success]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsed = UpdateTestimonialImageFormSchema.safeParse({ image });

        if (!parsed.success) {
            return setError(parsed.error.issues[0]?.message ?? "Revisa la imagen");
        }

        setError(undefined);
        updateTestimonialImage.handleUpdateTestimonialImage(testimonial._id, parsed.data);
    };

    return (
        <form id={ADMIN_FORM_ID} className="mx-auto flex w-full max-w-240 flex-col gap-5" onSubmit={onSubmit} noValidate>
            <FormSection>
                <FormSectionTitle>Imagen actual</FormSectionTitle>

                <CurrentTestimonialImage image={testimonial.image} name={testimonial.name} />

                <p className="flex items-start gap-2.5 text-[13px] leading-[1.55] text-gray-600">
                    <FiAlertTriangle aria-hidden="true" className="mt-0.5 size-4 lg:size-4.5 shrink-0 text-red-600" />
                    Al guardar, esta imagen se reemplaza por la nueva y se borra del servidor.
                </p>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Nueva imagen</FormSectionTitle>

                <ImageField image={image} onChange={setImage} error={error} label="Nuevo logo o foto de la empresa" />
            </FormSection>

            <ActionButton loading={updateTestimonialImage.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="size-4 lg:size-4.5" />
                {updateTestimonialImage.loading ? 'Guardando...' : 'Reemplazar imagen'}
            </ActionButton>
        </form>
    )
}
