"use client"

import { Control, FieldErrors, UseFormRegister, useWatch } from "react-hook-form";

import { TBlogCategoryForm } from "@/schemas/blogCategory/blogCategory.form.schemas";
import { Label } from "@/components/admin/ui/form/Label";
import { Input } from "@/components/admin/ui/form/Input";
import { Textarea } from "@/components/admin/ui/form/Textarea";
import { SpanError } from "@/components/admin/ui/form/SpanError";
import { FormHint } from "@/components/admin/ui/form/FormHint";
import { CharCounter } from "@/components/admin/ui/form/CharCounter";
import { FormSection } from "@/components/admin/ui/form/FormSection";
import { FormSectionTitle } from "@/components/admin/ui/form/FormSectionTitle";

type TBlogCategoryFieldsProps = {
    register: UseFormRegister<TBlogCategoryForm>;
    control: Control<TBlogCategoryForm>;
    errors: FieldErrors<TBlogCategoryForm>;
};

/** Campos compartidos por crear y editar categoria. El slug lo genera el backend a partir del nombre. */
export const BlogCategoryFields = ({ register, control, errors }: TBlogCategoryFieldsProps) => {
    const seo = useWatch({ control, name: "seo" });

    return (
        <>
            <FormSection>
                <FormSectionTitle>Información de la Categoría</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="name">Nombre:</Label>
                    <Input type="text" id="name" placeholder="Ej: Diseño de Stands" {...register("name")} />
                    <SpanError message={errors.name?.message} />
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
