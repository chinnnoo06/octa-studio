"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Control, FieldErrors, useForm, UseFormRegister, useWatch } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFloppyDisk } from 'react-icons/fa6';
import { toast } from "react-toastify";

import { UpdateBlogFormSchema, TUpdateBlogForm } from '@/schemas/blog/blog.form.schemas';
import { TBlog } from "@/schemas/blog/blog.schemas";
import { TBlogCategory } from "@/schemas/blogCategory/blogCategory.schemas";
import { withAbsoluteContentImages } from '@/utils/blogContentImages';
import { useBlog } from "@/hooks/useBlog";
import { FormSection } from "@/components/admin/ui/form/FormSection";
import { FormSectionTitle } from "@/components/admin/ui/form/FormSectionTitle";
import { ImageField } from "@/components/admin/ui/form/ImageField";
import { ActionButton } from "@/components/admin/ui/buttons/ActionButton";
import { BlogFields } from "./BlogFields";

type TFieldsForm = Omit<TUpdateBlogForm, "image">;

export const EditBlogForm = ({ blog, categories }: { blog: TBlog; categories: TBlogCategory[] }) => {
    const router = useRouter();

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TUpdateBlogForm>({
        resolver: zodResolver(UpdateBlogFormSchema),
        defaultValues: {
            title: blog.title,
            content: withAbsoluteContentImages(blog.content),
            excerpt: blog.excerpt,
            category: blog.category?._id ?? '',
            status: blog.status,
            image: undefined,
            seo: {
                metaTitle: blog.seo.metaTitle,
                metaDescription: blog.seo.metaDescription
            }
        }
    })

    const { updateBlog } = useBlog();

    useEffect(() => {
        if (updateBlog.error) toast.error(updateBlog.error);
        if (updateBlog.success) {
            toast.success(updateBlog.success);
            router.push('/admin/blogs');
        }
    }, [updateBlog.error, updateBlog.success, router]);

    const image = useWatch({ control, name: 'image' });

    const onSubmit = (data: TUpdateBlogForm) => updateBlog.handleUpdateBlog(blog._id, data)

    return (
        <form id="admin-form" className="mx-auto flex w-full max-w-240 flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>

            <BlogFields
                register={register as unknown as UseFormRegister<TFieldsForm>}
                control={control as unknown as Control<TFieldsForm>}
                errors={errors as FieldErrors<TFieldsForm>}
                categories={categories}
            />

            <FormSection>
                <FormSectionTitle>Imagen Destacada</FormSectionTitle>

                <ImageField
                    image={image ?? null}
                    onChange={(file) => setValue('image', file ?? undefined, { shouldValidate: true })}
                    error={errors.image?.message}
                    label="Cambiar Imagen:"
                    currentUrl={`${process.env.NEXT_PUBLIC_BLOGS_IMAGE_URL}/${blog.image}`}
                />
            </FormSection>

            <ActionButton loading={updateBlog.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="size-4 lg:size-4.5" />
                {updateBlog.loading ? 'Guardando...' : 'Guardar cambios'}
            </ActionButton>
        </form>
    )
}
