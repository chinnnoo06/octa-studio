"use client"

import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFloppyDisk } from 'react-icons/fa6';
import { toast } from "react-toastify";

import { CreateBlogFormSchema, TCreateBlogForm } from '@/schemas/blog/blog.form.schemas';
import { BLOG_CATEGORIES, BLOG_STATUS_LABELS, BLOG_STATUSES } from "@/utils/data/blogs";
import { useBlog } from "@/hooks/useBlog";
import { Label } from "@/components/ui/form/Label";
import { FIELD, Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { SpanError } from "@/components/ui/form/SpanError";
import { FormHint } from "@/components/ui/form/FormHint";
import { CharCounter } from "@/components/ui/form/CharCounter";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { ADMIN_FORM_ID } from "@/components/ui/buttons/FormSubmitButton";
import { ImageField } from "@/components/ui/form/ImageField";
import { BlogEditorField } from "./BlogEditorField";

const SELECT =
    `${FIELD} select-arrow cursor-pointer pr-8`;

export const CreateBlogForm = () => {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TCreateBlogForm>({
        resolver: zodResolver(CreateBlogFormSchema),
        defaultValues: {
            title: '',
            excerpt: '',
            category: undefined,
            status: 'published',
            readingTime: undefined,
            content: '',
            image: undefined,
            seo: { metaTitle: '', metaDescription: '' }
        }
    })

    const { createBlog } = useBlog();

    useEffect(() => {
        if (createBlog.error) toast.error(createBlog.error);
        if (createBlog.success) toast.success(createBlog.success);
    }, [createBlog.error, createBlog.success]);

    const image = useWatch({ control, name: 'image' });

    // Los contadores de caracteres leen el valor mientras se escribe.
    const seo = useWatch({ control, name: 'seo' });
    const excerpt = useWatch({ control, name: 'excerpt' });

    const onSubmit = (data: TCreateBlogForm) => createBlog.handleCreateBlog(data)

    return (
        <form id={ADMIN_FORM_ID} className="mx-auto flex w-full max-w-240 flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>

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
                    <Label htmlFor="status">Estado</Label>
                    <select id="status" className={SELECT} {...register("status")}>
                        {BLOG_STATUSES.map((status) => (
                            <option key={status} value={status}>{BLOG_STATUS_LABELS[status]}</option>
                        ))}
                    </select>
                    <SpanError message={errors.status?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="excerpt">Extracto</Label>
                    <Textarea id="excerpt" rows={3} placeholder="Resumen breve, máximo 300 caracteres" {...register("excerpt")} />
                    <CharCounter value={excerpt} optimalMin={70} max={300} />
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

                <FormHint>Optimiza cómo se muestra en los buscadores: el meta título es el enlace azul de Google y la meta descripción, el texto de debajo.</FormHint>

                <div className="form-group">
                    <Label htmlFor="metaTitle">Meta título</Label>
                    <Input type="text" id="metaTitle" placeholder="Máximo 60 caracteres" {...register("seo.metaTitle")} />
                    <CharCounter value={seo?.metaTitle} optimalMin={40} max={60} />
                    <SpanError message={errors.seo?.metaTitle?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="metaDescription">Meta descripción</Label>
                    <Textarea id="metaDescription" rows={3} placeholder="Máximo 160 caracteres" {...register("seo.metaDescription")} />
                    <CharCounter value={seo?.metaDescription} optimalMin={120} max={160} />
                    <SpanError message={errors.seo?.metaDescription?.message} />
                </div>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Imagen destacada</FormSectionTitle>

                <ImageField
                    image={image ?? null}
                    onChange={(file) => setValue('image', file as File, { shouldValidate: true })}
                    error={errors.image?.message}
                    hint="Se recomienda una foto horizontal: se recorta para llenar el encabezado de la entrada y las tarjetas."
                />
            </FormSection>

            <ActionButton loading={createBlog.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="size-4 lg:size-4.5" />
                {createBlog.loading ? 'Guardando...' : 'Crear blog'}
            </ActionButton>
        </form>
    )
}
