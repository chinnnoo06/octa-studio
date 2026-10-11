"use client"

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFloppyDisk } from 'react-icons/fa6';
import { toast } from "react-toastify";

import { UpdateProjectFormSchema, TUpdateProjectForm } from '@/schemas/project/project.form.schemas';
import { TProject } from "@/schemas/project/project.schemas";
import { useProject } from "@/hooks/useProject";
import { Label } from "@/components/ui/form/Label";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { SpanError } from "@/components/ui/form/SpanError";
import { FormHint } from "@/components/ui/form/FormHint";
import { CharCounter } from "@/components/ui/form/CharCounter";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { ADMIN_FORM_ID } from "@/components/ui/buttons/FormSubmitButton";


export const EditProjectForm = ({ project }: { project: TProject }) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<TUpdateProjectForm>({
        resolver: zodResolver(UpdateProjectFormSchema),
        defaultValues: {
            name: project.name,
            description: project.description,
            sector: project.sector,
            seo: {
                metaTitle: project.seo.metaTitle,
                metaDescription: project.seo.metaDescription
            }
        }
    })

    const { updateProject } = useProject();

    useEffect(() => {
        if (updateProject.error) toast.error(updateProject.error);
        if (updateProject.success) toast.success(updateProject.success);
    }, [updateProject.error, updateProject.success]);

    // Los contadores de caracteres leen el valor mientras se escribe.
    const seo = useWatch({ control, name: 'seo' });

    const onSubmit = (data: TUpdateProjectForm) => updateProject.handleUpdateProject(project._id, data)

    return (
        <form id={ADMIN_FORM_ID} className="mx-auto flex w-full max-w-240 flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>

            <FormSection>
                <FormSectionTitle>Información</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="name">Nombre</Label>
                    <Input type="text" id="name" placeholder="Nombre del proyecto" {...register("name")} />
                    <SpanError message={errors.name?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="sector">Sector</Label>
                    <Input type="text" id="sector" placeholder="Agro, ferretera, farmacéutica…" {...register("sector")} />
                    <SpanError message={errors.sector?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea id="description" rows={4} placeholder="Qué se montó y para quién" {...register("description")} />
                    <SpanError message={errors.description?.message} />
                </div>
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

            <ActionButton loading={updateProject.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="size-4 lg:size-4.5" />
                {updateProject.loading ? 'Guardando...' : 'Guardar cambios'}
            </ActionButton>
        </form>
    )
}
