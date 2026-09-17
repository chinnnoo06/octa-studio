"use client"

import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFloppyDisk } from 'react-icons/fa6';
import { toast } from "react-toastify";

import { UpdateProjectFormSchema, TUpdateProjectForm } from '@/schemas/projects/projects.form.schemas';
import { TProject } from "@/schemas/projects/projects.schemas";
import { useProjects } from "@/hooks/projects/useProjects";
import { Label } from "@/components/ui/form/Label";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { SpanError } from "@/components/ui/form/SpanError";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { ActionButton } from "@/components/ui/buttons/ActionButton";


export const EditProjectForm = ({ project }: { project: TProject }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<TUpdateProjectForm>({
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

    const { updateProject } = useProjects();

    useEffect(() => {
        if (updateProject.error) toast.error(updateProject.error);
        if (updateProject.success) toast.success(updateProject.success);
    }, [updateProject.error, updateProject.success]);

    const onSubmit = (data: TUpdateProjectForm) => updateProject.handleUpdateProject(project._id, data)

    return (
        <form className='space-y-8' onSubmit={handleSubmit(onSubmit)} noValidate>

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

            <ActionButton loading={updateProject.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                {updateProject.loading ? 'Guardando...' : 'Guardar cambios'}
            </ActionButton>
        </form>
    )
}
