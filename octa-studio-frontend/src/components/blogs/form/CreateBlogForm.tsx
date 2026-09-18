"use client"

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFloppyDisk } from 'react-icons/fa6';
import { toast } from "react-toastify";

import { CreateBlogFormSchema, TCreateBlogForm } from '@/schemas/blogs/blogs.form.schemas';
import { BLOG_CATEGORIES } from '@/utils/data/blogs';
import { useBlogs } from "@/hooks/blogs/useBlogs";
import { Label } from "@/components/ui/form/Label";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { SpanError } from "@/components/ui/form/SpanError";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { ImageField } from "@/components/ui/form/ImageField";
import { BlogEditorField } from "./BlogEditorField";

const SELECT =
    'border-secondary/50 text-fourth/75 focus:border-secondary hover:border-secondary w-full cursor-pointer rounded-lg border bg-white px-5 py-2.5 text-xs outline-none transition-all duration-300 lg:text-sm';

export const CreateBlogForm = () => {
    const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<TCreateBlogForm>({
        resolver: zodResolver(CreateBlogFormSchema),
        defaultValues: {
            title: '',
            excerpt: '',
            category: undefined,
            readingTime: undefined,
            content: '',
            image: undefined,
            seo: { metaTitle: '', metaDescription: '' }
        }
    })

    const { createBlog } = useBlogs();

    useEffect(() => {
        if (createBlog.error) toast.error(createBlog.error);
        if (createBlog.success) toast.success(createBlog.success);
    }, [createBlog.error, createBlog.success]);

    const image = watch('image');

    const onSubmit = (data: TCreateBlogForm) => createBlog.handleCreateBlog(data)

    return (
        <form className='space-y-8' onSubmit={handleSubmit(onSubmit)} noValidate>

            <FormSection>
                <FormSectionTitle>Datos del blog</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="title">Título</Label>
                    <Input type="text" id="title" placeholder="Título del artículo" {...register("title")} />
                    <SpanError message={errors.title?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="category">Categoría</Label>
                    <select id="category" defaultValue="" className={SELECT} {...register("category")}>
                        <option value="" disabled>Elige una categoría</option>
                        {BLOG_CATEGORIES.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <SpanError message={errors.category?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="excerpt">Extracto</Label>
                    <Textarea id="excerpt" rows={3} placeholder="Resumen breve, máximo 300 caracteres" {...register("excerpt")} />
                    <SpanError message={errors.excerpt?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="readingTime">Tiempo de lectura (minutos)</Label>
                    <Input type="number" id="readingTime" min={1} step={1} placeholder="Ej. 5" {...register("readingTime", { valueAsNumber: true })} />
                    <SpanError message={errors.readingTime?.message} />
                </div>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Contenido del blog</FormSectionTitle>

                {/* El editor no es un input nativo: entra por Controller con valor y onChange. */}
                <Controller
                    control={control}
                    name="content"
                    render={({ field }) => (
                        <BlogEditorField value={field.value} onChange={field.onChange} error={errors.content?.message} />
                    )}
                />
            </FormSection>

            <FormSection>
                <FormSectionTitle>SEO</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="metaTitle">Meta título</Label>
                    <Input type="text" id="metaTitle" placeholder="Máximo 60 caracteres" {...register("seo.metaTitle")} />
                    <SpanError message={errors.seo?.metaTitle?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="metaDescription">Meta descripción</Label>
                    <Textarea id="metaDescription" rows={3} placeholder="Máximo 160 caracteres" {...register("seo.metaDescription")} />
                    <SpanError message={errors.seo?.metaDescription?.message} />
                </div>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Imagen destacada</FormSectionTitle>

                <ImageField
                    image={image ?? null}
                    onChange={(file) => setValue('image', file as File, { shouldValidate: true })}
                    error={errors.image?.message}
                />
            </FormSection>

            <ActionButton loading={createBlog.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                {createBlog.loading ? 'Guardando...' : 'Crear blog'}
            </ActionButton>
        </form>
    )
}
