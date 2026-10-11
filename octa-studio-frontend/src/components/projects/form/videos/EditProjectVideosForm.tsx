"use client"

import { useEffect, useState } from "react";
import { FaFloppyDisk } from 'react-icons/fa6';
import { FiAlertTriangle } from 'react-icons/fi';
import { toast } from "react-toastify";

import { UpdateProjectVideosFormSchema } from '@/schemas/project/project.form.schemas';
import { TProject } from "@/schemas/project/project.schemas";
import { useProject } from "@/hooks/useProject";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { VideosField } from "@/components/ui/form/VideosField";
import { CurrentVideos } from "./CurrentVideos";

export const EditProjectVideosForm = ({ project }: { project: TProject }) => {
    const [videos, setVideos] = useState<File[]>([]);
    const [error, setError] = useState<string>();

    const { updateProjectVideos } = useProject();

    useEffect(() => {
        if (updateProjectVideos.error) toast.error(updateProjectVideos.error);
        if (updateProjectVideos.success) toast.success(updateProjectVideos.success);
    }, [updateProjectVideos.error, updateProjectVideos.success]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsed = UpdateProjectVideosFormSchema.safeParse({ videos });

        if (!parsed.success) {
            return setError(parsed.error.issues[0]?.message ?? "Revisa los videos");
        }

        setError(undefined);
        updateProjectVideos.handleUpdateProjectVideos(project._id, parsed.data);
    };

    return (
        <form className="space-y-10" onSubmit={onSubmit} noValidate>
            <FormSection>
                <FormSectionTitle>Videos actuales</FormSectionTitle>

                <CurrentVideos videos={project.videos} name={project.name} />

                <p className="text-fourth/75 flex items-start gap-2.5 text-xs lg:text-sm">
                    <FiAlertTriangle aria-hidden="true" className="mt-0.5 size-4 lg:size-4.5 shrink-0 text-red-600" />
                    Al guardar, estos videos se reemplazan por los nuevos y se borran del servidor.
                    Para conservar alguno, vuelve a subirlo junto con los demás. Si guardas sin
                    videos, el proyecto se queda sin ninguno.
                </p>
            </FormSection>

            <FormSection>
                <FormSectionTitle>Nuevos videos</FormSectionTitle>

                <VideosField videos={videos} onChange={setVideos} error={error} />
            </FormSection>

            <ActionButton loading={updateProjectVideos.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="size-4 lg:size-4.5" />
                {updateProjectVideos.loading ? 'Guardando...' : 'Reemplazar videos'}
            </ActionButton>
        </form>
    )
}
