"use client"

import { useEffect, useState } from "react";
import { FaFloppyDisk } from 'react-icons/fa6';
import { FiAlertTriangle } from 'react-icons/fi';
import { toast } from "react-toastify";

import { UpdateProjectImagesFormSchema } from '@/schemas/project/project.form.schemas';
import { TProject } from "@/schemas/project/project.schemas";
import { useProject } from "@/hooks/useProject";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { CurrentImages } from "./CurrentImages";
import { ImagesField } from "@/components/ui/form/ImagesField";

export const EditProjectImagesForm = ({ project }: { project: TProject }) => {
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<string>();

    const { updateProjectImages } = useProject();

    useEffect(() => {
        if (updateProjectImages.error) toast.error(updateProjectImages.error);
        if (updateProjectImages.success) toast.success(updateProjectImages.success);
    }, [updateProjectImages.error, updateProjectImages.success]);

    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsed = UpdateProjectImagesFormSchema.safeParse({ images });

        if (!parsed.success) {
            return setError(parsed.error.issues[0]?.message ?? "Revisa las imágenes");
        }

        setError(undefined);
        updateProjectImages.handleUpdateProjectImages(project._id, parsed.data);
    };

    return (
        <form className="space-y-10" onSubmit={onSubmit} noValidate>
            <FormSection>
                <FormSectionTitle>Imágenes actuales</FormSectionTitle>

                <CurrentImages images={project.images} name={project.name} />

                <p className="text-fourth/75 flex items-start gap-2.5 text-xs lg:text-sm">
                    <FiAlertTriangle aria-hidden="true" className="mt-0.5 size-4 lg:size-4.5 shrink-0 text-red-600" />
                    Al guardar, estas imágenes se reemplazan por las nuevas y se borran del
                    servidor. Para conservar alguna, vuelve a subirla junto con las demás.
                </p>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Nuevas imágenes</FormSectionTitle>

                <ImagesField images={images} onChange={setImages} error={error} />
            </FormSection>

            <ActionButton loading={updateProjectImages.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="size-4 lg:size-4.5" />
                {updateProjectImages.loading ? 'Guardando...' : 'Reemplazar imágenes'}
            </ActionButton>
        </form>
    )
}
