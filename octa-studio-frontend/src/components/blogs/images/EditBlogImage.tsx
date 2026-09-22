"use client"

import { useEffect, useState } from "react";
import { FaFloppyDisk } from 'react-icons/fa6';
import { FiAlertTriangle } from 'react-icons/fi';
import { toast } from "react-toastify";

import { BlogImageFormSchema } from '@/schemas/blogs/blogs.form.schemas';
import { TBlog } from "@/schemas/blogs/blogs.schemas";
import { useBlogs } from "@/hooks/blogs/useBlogs";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { ImageField } from "@/components/ui/form/ImageField";
import { CurrentBlogImage } from "./CurrentBlogImage";

export const EditBlogImage = ({ blog }: { blog: TBlog }) => {
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string>();

    const { updateBlogImage } = useBlogs();

    useEffect(() => {
        if (updateBlogImage.error) toast.error(updateBlogImage.error);
        if (updateBlogImage.success) toast.success(updateBlogImage.success);
    }, [updateBlogImage.error, updateBlogImage.success]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsed = BlogImageFormSchema.safeParse({ image });

        if (!parsed.success) {
            return setError(parsed.error.issues[0]?.message ?? "Revisa la imagen");
        }

        setError(undefined);
        updateBlogImage.handleUpdateBlogImage(blog._id, parsed.data);
    };

    return (
        <form className="space-y-8" onSubmit={onSubmit} noValidate>
            <FormSection>
                <FormSectionTitle>Imagen actual</FormSectionTitle>

                <CurrentBlogImage image={blog.image} name={blog.title} />

                <p className="text-fourth/75 flex items-start gap-2 text-xs lg:text-sm">
                    <FiAlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red-600" />
                    Al guardar, esta imagen se reemplaza por la nueva y se borra del servidor.
                    Las imágenes dentro del contenido no se tocan.
                </p>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Nueva imagen</FormSectionTitle>

                <ImageField
                    image={image}
                    onChange={setImage}
                    error={error}
                    label="Nueva imagen destacada"
                    hint="Se recomienda una foto horizontal: se recorta para llenar el encabezado de la entrada y las tarjetas."
                />
            </FormSection>

            <ActionButton loading={updateBlogImage.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                {updateBlogImage.loading ? 'Guardando...' : 'Reemplazar imagen'}
            </ActionButton>
        </form>
    )
}
