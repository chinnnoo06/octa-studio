"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Control, FieldErrors, useForm, UseFormRegister, useWatch } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFloppyDisk } from 'react-icons/fa6';
import { toast } from "react-toastify";

import { CreateBlogFormSchema, TCreateBlogForm } from '@/schemas/blog/blog.form.schemas';
import { TBlogCategory } from "@/schemas/blogCategory/blogCategory.schemas";
import { useBlog } from "@/hooks/useBlog";
import { FormSection } from "@/components/admin/ui/form/FormSection";
import { FormSectionTitle } from "@/components/admin/ui/form/FormSectionTitle";
import { ImageField } from "@/components/admin/ui/form/ImageField";
import { ActionButton } from "@/components/admin/ui/buttons/ActionButton";
import { BlogFields } from "./BlogFields";

type TFieldsForm = Omit<TCreateBlogForm, "image">;

export const CreateBlogForm = ({ categories }: { categories: TBlogCategory[] }) => {
    const router = useRouter();

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TCreateBlogForm>({
        resolver: zodResolver(CreateBlogFormSchema),
        defaultValues: {
            title: '',
            content: '',
            excerpt: '',
            category: '',
            // Como en el panel de referencia, una entrada nueva empieza como borrador.
            status: 'draft',
            image: undefined,
            seo: { metaTitle: '', metaDescription: '' }
        }
    })

    const { createBlog } = useBlog();

    useEffect(() => {
        if (createBlog.error) toast.error(createBlog.error);
        if (createBlog.success) {
            toast.success(createBlog.success);
            router.push('/admin/blogs');
        }
    }, [createBlog.error, createBlog.success, router]);

    const image = useWatch({ control, name: 'image' });

    const onSubmit = (data: TCreateBlogForm) => createBlog.handleCreateBlog(data)

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
                    onChange={(file) => setValue('image', file as File, { shouldValidate: true })}
                    error={errors.image?.message}
                    label={image ? 'Cambiar Imagen:' : 'Seleccionar Imagen:'}
                />
            </FormSection>

            <ActionButton loading={createBlog.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="size-4 lg:size-4.5" />
                {createBlog.loading ? 'Guardando...' : 'Crear blog'}
            </ActionButton>
        </form>
    )
}
