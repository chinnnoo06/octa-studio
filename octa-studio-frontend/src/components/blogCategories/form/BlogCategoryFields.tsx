"use client"

import { useState } from "react";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form";

import { TBlogCategoryForm } from "@/schemas/blogCategory/blogCategory.form.schemas";
import { Label } from "@/components/ui/form/Label";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { SpanError } from "@/components/ui/form/SpanError";
import { FormHint } from "@/components/ui/form/FormHint";
import { CharCounter } from "@/components/ui/form/CharCounter";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";

type TBlogCategoryFieldsProps = {
    register: UseFormRegister<TBlogCategoryForm>;
    control: Control<TBlogCategoryForm>;
    setValue: UseFormSetValue<TBlogCategoryForm>;
    errors: FieldErrors<TBlogCategoryForm>;
};

/** Slug a partir del nombre mientras se escribe, igual que el campo del panel de referencia. */
const toSlug = (text: string) =>
    text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim()
        .replace(/\s+/g, "-").replace(/[^a-z0-9-]+/g, "").replace(/-+/g, "-");

/** Campos compartidos por crear y editar categoria. */
export const BlogCategoryFields = ({ register, control, setValue, errors }: TBlogCategoryFieldsProps) => {
    const seo = useWatch({ control, name: "seo" });
    const slug = useWatch({ control, name: "slug" });

    // Mientras el slug venga del nombre se actualiza solo; si se escribe a mano, se respeta.
    const [autoSlug, setAutoSlug] = useState(() => !slug);

    const name = register("name", {
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            if (autoSlug) setValue("slug", toSlug(event.target.value), { shouldValidate: true });
        },
    });

    const slugField = register("slug", {
        onChange: () => setAutoSlug(false),
    });

    return (
        <>
            <FormSection>
                <FormSectionTitle>Información de la Categoría</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="name">Nombre:</Label>
                    <Input type="text" id="name" placeholder="Ej: Diseño de Stands" {...name} />
                    <SpanError message={errors.name?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="slug">Slug (URL Amigable):</Label>
                    <Input type="text" id="slug" placeholder="ej: diseno-de-stands (se genera si se deja vacío)" {...slugField} />
                    <p className="mt-1.5 text-[13px] leading-[1.55] text-gray-600">
                        Se usará en la URL: <code className="rounded bg-slate-100 px-1 text-[12px]">/blogs?categoria=&lt;slug&gt;</code>
                    </p>
                    <SpanError message={errors.slug?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="description">Descripción:</Label>
                    <Textarea
                        id="description"
                        rows={3}
                        maxLength={300}
                        placeholder="Breve descripción de la categoría (se muestra en la página de la categoría)."
                        {...register("description")}
                    />
                    <SpanError message={errors.description?.message} />
                </div>
            </FormSection>

            <FormSection>
                <FormSectionTitle>SEO</FormSectionTitle>

                <FormHint>Opcional. Controla cómo se muestra la página de esta categoría en buscadores.</FormHint>

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
