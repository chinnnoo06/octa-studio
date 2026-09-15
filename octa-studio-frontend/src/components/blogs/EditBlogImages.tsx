"use client"

import { useEffect, useState } from "react";
import { FaFloppyDisk } from 'react-icons/fa6';
import { FiAlertTriangle } from 'react-icons/fi';
import { toast } from "react-toastify";

import { BlogImagesFormSchema } from '@/schemas/blogs/blogs.form.schemas';
import { TBlog } from "@/schemas/blogs/blogs.schemas";
import { useBlogs } from "@/hooks/blogs/useBlogs";
import { ActionButton } from "../ui/buttons/ActionButton";
import { FormSection } from "../ui/form/FormSection";
import { FormSectionTitle } from "../ui/form/FormSectionTitle";
import { ImagesField } from "../projects/ImagesField";
import { CurrentBlogImages } from "./CurrentBlogImages";

export const EditBlogImages = ({ blog }: { blog: TBlog }) => {
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<string>();

    const { updateBlogImages } = useBlogs();

    useEffect(() => {
        if (updateBlogImages.error) toast.error(updateBlogImages.error);
        if (updateBlogImages.success) toast.success(updateBlogImages.success);
    }, [updateBlogImages.error, updateBlogImages.success]);


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsed = BlogImagesFormSchema.safeParse({ images });

        if (!parsed.success) {
            return setError(parsed.error.issues[0]?.message ?? "Revisa las imágenes");
        }

        setError(undefined);
        updateBlogImages.handleUpdateBlogImages(blog._id, parsed.data);
    };

    return (
        <form className="space-y-8" onSubmit={onSubmit} noValidate>
            <FormSection>
                <FormSectionTitle>Imágenes actuales</FormSectionTitle>

                <CurrentBlogImages images={blog.images} name={blog.title} />

                <p className="text-fourth/75 flex items-start gap-2 text-xs lg:text-sm">
                    <FiAlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red-600" />
                    Al guardar, estas imágenes se reemplazan por las nuevas y se borran del
                    servidor. Para conservar alguna, vuelve a subirla junto con las demás.
                </p>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Nuevas imágenes</FormSectionTitle>

                <ImagesField images={images} onChange={setImages} error={error} />
            </FormSection>

            <ActionButton loading={updateBlogImages.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                {updateBlogImages.loading ? 'Guardando...' : 'Reemplazar imágenes'}
            </ActionButton>
        </form>
    )
}
