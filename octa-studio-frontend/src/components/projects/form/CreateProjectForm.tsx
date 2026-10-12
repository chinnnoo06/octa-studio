"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFloppyDisk } from 'react-icons/fa6';
import { toast } from "react-toastify";

import { CreateProjectFormSchema, TCreateProjectForm } from '@/schemas/project/project.form.schemas';
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
import { ImagesField } from "@/components/ui/form/ImagesField";
import { VideosField } from "@/components/ui/form/VideosField";

export const CreateProjectForm = () => {
    const router = useRouter();

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TCreateProjectForm>({
        resolver: zodResolver(CreateProjectFormSchema),
        defaultValues: {
            name: '',
            description: '',
            sector: '',
            images: [],
            videos: [],
            seo: { metaTitle: '', metaDescription: '' }
        }
    })

    const { createProject } = useProject();

    useEffect(() => {
        if (createProject.error) toast.error(createProject.error);
        if (createProject.success) {
            toast.success(createProject.success);
            router.push('/admin/proyectos');
        }
    }, [createProject.error, createProject.success, router]);

    const images = useWatch({ control, name: 'images' });
    const videos = useWatch({ control, name: 'videos' });

    // Los contadores de caracteres leen el valor mientras se escribe.
    const seo = useWatch({ control, name: 'seo' });

    const onSubmit = (data: TCreateProjectForm) => createProject.handleCreateProject(data)

    return (
        <form id={ADMIN_FORM_ID} className="mx-auto flex w-full max-w-240 flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>

            <FormSection>
                <FormSectionTitle>Información del Proyecto</FormSectionTitle>

                <div className="form-group">
                    <Label htmlFor="name">Nombre del Proyecto</Label>
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

                <FormHint>Optimiza cómo se muestra este proyecto en los buscadores. Si dejas los campos vacíos, se usará el nombre del proyecto y su descripción.</FormHint>

                <div className="form-group">
                    <Label htmlFor="metaTitle">Meta título</Label>
                    <Input type="text" id="metaTitle" placeholder="Opcional · recomendado 40-60 caracteres" {...register("seo.metaTitle")} />
                    <CharCounter value={seo?.metaTitle} optimalMin={40} max={60} />
                    <SpanError message={errors.seo?.metaTitle?.message} />
                </div>

                <div className="form-group">
                    <Label htmlFor="metaDescription">Meta descripción</Label>
                    <Textarea id="metaDescription" rows={3} placeholder="Opcional · recomendado 120-160 caracteres" {...register("seo.metaDescription")} />
                    <CharCounter value={seo?.metaDescription} optimalMin={120} max={160} />
                    <SpanError message={errors.seo?.metaDescription?.message} />
                </div>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Imágenes</FormSectionTitle>

                <ImagesField
                    images={images}
                    onChange={(next) => setValue('images', next, { shouldValidate: true })}
                    error={errors.images?.message}
                />
            </FormSection>

            <FormSection>
                <FormSectionTitle>Videos</FormSectionTitle>

                <VideosField
                    videos={videos}
                    onChange={(next) => setValue('videos', next, { shouldValidate: true })}
                    error={errors.videos?.message}
                />
            </FormSection>

            <ActionButton loading={createProject.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="size-4 lg:size-4.5" />
                {createProject.loading ? 'Guardando...' : 'Crear proyecto'}
            </ActionButton>
        </form>
    )
}
