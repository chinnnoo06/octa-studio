"use client"

import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFloppyDisk } from 'react-icons/fa6';
import { toast } from "react-toastify";

import { BLOG_CATEGORIES, UpdateBlogFormSchema, TUpdateBlogForm } from '@/schemas/blogs/blogs.form.schemas';
import { TBlog } from "@/schemas/blogs/blogs.schemas";
import { useBlogs } from "@/hooks/blogs/useBlogs";
import { Label } from "../ui/form/Label";
import { Input } from "../ui/form/Input";
import { Textarea } from "../ui/form/Textarea";
import { SpanError } from "../ui/form/SpanError";
import { FormSection } from "../ui/form/FormSection";
import { FormSectionTitle } from "../ui/form/FormSectionTitle";
import { ActionButton } from "../ui/buttons/ActionButton";
import { BlogContentField } from "./BlogContentField";

const SELECT =
    'border-secondary/50 text-fourth/75 focus:border-secondary hover:border-secondary w-full cursor-pointer rounded-lg border bg-white px-5 py-2.5 text-xs outline-none transition-all duration-300 lg:text-sm';

export const EditBlogForm = ({ blog }: { blog: TBlog }) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<TUpdateBlogForm>({
        resolver: zodResolver(UpdateBlogFormSchema),
        defaultValues: {
            title: blog.title,
            excerpt: blog.excerpt,
            // En `TBlog` la categoria es `string` porque viene del backend; aqui
            // el formulario la acota al enum. Si el backend devolviera una que ya
            // no existe, el propio resolver lo marca al enviar.
            category: blog.category as TUpdateBlogForm['category'],
            content: blog.content,
            seo: {
                metaTitle: blog.seo.metaTitle,
                metaDescription: blog.seo.metaDescription
            }
        }
    })

    const { updateBlog } = useBlogs();

    useEffect(() => {
        if (updateBlog.error) toast.error(updateBlog.error);
        if (updateBlog.success) toast.success(updateBlog.success);
    }, [updateBlog.error, updateBlog.success]);

    const content = watch('content');

    const onSubmit = (data: TUpdateBlogForm) => updateBlog.handleUpdateBlog(blog._id, data)

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
                    <select id="category" className={SELECT} {...register("category")}>
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
            </FormSection>

            <FormSection>
                <FormSectionTitle>Contenido</FormSectionTitle>

                <BlogContentField
                    content={content}
                    onChange={(next) => setValue('content', next, { shouldValidate: true })}
                    error={errors.content?.message}
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

            <ActionButton loading={updateBlog.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                {updateBlog.loading ? 'Guardando...' : 'Guardar cambios'}
            </ActionButton>
        </form>
    )
}
