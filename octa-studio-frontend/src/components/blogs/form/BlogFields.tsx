"use client"

import Link from "next/link";
import { Control, Controller, FieldErrors, UseFormRegister, useWatch } from "react-hook-form";

import { TCreateBlogForm } from "@/schemas/blog/blog.form.schemas";
import { TBlogCategory } from "@/schemas/blogCategory/blogCategory.schemas";
import { BLOG_STATUS_LABELS, BLOG_STATUS_OPTIONS } from "@/utils/data/blogs";
import { Label } from "@/components/ui/form/Label";
import { FIELD, Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { SpanError } from "@/components/ui/form/SpanError";
import { FormHint } from "@/components/ui/form/FormHint";
import { CharCounter } from "@/components/ui/form/CharCounter";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { BlogEditorField } from "./BlogEditorField";

const SELECT = `${FIELD} select-arrow cursor-pointer pr-8`;

// Crear y editar comparten estos campos; la imagen va aparte en cada formulario.
type TBlogFieldsForm = Omit<TCreateBlogForm, "image">;

type TBlogFieldsProps = {
    register: UseFormRegister<TBlogFieldsForm>;
    control: Control<TBlogFieldsForm>;
    errors: FieldErrors<TBlogFieldsForm>;
    categories: TBlogCategory[];
};

/** "Información del Blog" y "SEO", en el orden y con los textos del panel de referencia. */
export const BlogFields = ({ register, control, errors, categories }: TBlogFieldsProps) => {
    const seo = useWatch({ control, name: "seo" });
    const excerpt = useWatch({ control, name: "excerpt" });

    return (
        <>
            <FormSection>
                <FormSectionTitle>Información del Blog</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="title">Título:</Label>
                    <Input type="text" id="title" placeholder="Título de la Entrada del Blog" {...register("title")} />
                    <SpanError message={errors.title?.message} />
                </div>

                {/* El editor no es un input nativo: entra por Controller con valor y onChange. */}
                <Controller
                    control={control}
                    name="content"
                    render={({ field }) => (
                        <BlogEditorField value={field.value} onChange={field.onChange} error={errors.content?.message} />
                    )}
                />

                <div className="form-group">
                    <Label htmlFor="excerpt">Extracto / Resumen:</Label>
                    <Textarea
                        id="excerpt"
                        rows={3}
                        maxLength={300}
                        placeholder="Breve resumen que aparece en las tarjetas del listado y en buscadores (opcional). Si lo dejas vacío, se generará a partir del contenido."
                        {...register("excerpt")}
                    />
                    <CharCounter value={excerpt} optimalMin={70} max={200} />
                    <SpanError message={errors.excerpt?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="category">Categoría:</Label>
                    <select id="category" className={SELECT} {...register("category")}>
                        <option value="">-- Sin categoría --</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    <p className="mt-1.5 text-[13px] leading-[1.55] text-gray-600">
                        ¿Falta una categoría?{" "}
                        <Link href="/admin/blog-categorias" target="_blank" className="text-secondary font-semibold hover:underline">
                            Gestiona las categorías de blog
                        </Link>.
                    </p>
                    <SpanError message={errors.category?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="status">Estado:</Label>
                    <select id="status" className={SELECT} {...register("status")}>
                        {BLOG_STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>{BLOG_STATUS_LABELS[status]}</option>
                        ))}
                    </select>
                    <SpanError message={errors.status?.message} />
                </div>
            </FormSection>

            <FormSection>
                <FormSectionTitle>SEO</FormSectionTitle>

                <FormHint>Optimiza cómo se muestra esta entrada de blog en los buscadores. Si dejas los campos vacíos, se usará el título del blog y un extracto del contenido.</FormHint>

                <div className="form-group">
                    <Label htmlFor="metaTitle">Meta Título</Label>
                    <Input type="text" id="metaTitle" placeholder="Título para buscadores (recomendado 55-60 caracteres)" {...register("seo.metaTitle")} />
                    <CharCounter value={seo?.metaTitle} optimalMin={40} max={60} />
                    <SpanError message={errors.seo?.metaTitle?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="metaDescription">Meta Descripción</Label>
                    <Textarea id="metaDescription" rows={3} placeholder="Descripción para buscadores (recomendado 150-160 caracteres)" {...register("seo.metaDescription")} />
                    <CharCounter value={seo?.metaDescription} optimalMin={120} max={155} />
                    <SpanError message={errors.seo?.metaDescription?.message} />
                </div>
            </FormSection>
        </>
    );
};
