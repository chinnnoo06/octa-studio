'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useProject } from '@/hooks/useProject';
import { ConfirmationModal } from '@/components/admin/ui/ConfirmationModal';
import { ModalTrigger } from '@/components/admin/ui/ModalTrigger';
import { DeleteButton } from '@/components/admin/ui/buttons/DeleteButton';

type TDeleteProjectButtonProps = {
    id: string;
    name: string;
};

export const DeleteProjectButton = ({ id, name }: TDeleteProjectButtonProps) => {
    const { deleteProject } = useProject();

    useEffect(() => {
        if (deleteProject.error) toast.error(deleteProject.error);
        if (deleteProject.success) toast.success(deleteProject.success);
    }, [deleteProject.error, deleteProject.success]);

    return (
        <ModalTrigger
            renderTrigger={(onOpen) => (
                <DeleteButton onClick={onOpen} label={`Eliminar el proyecto ${name}`} />
            )}
        >
            {(onClose, isOpen) => (
                <ConfirmationModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onConfirm={async () => {
                        await deleteProject.handleDeleteProject(id);
                        onClose();
                    }}
                    loading={deleteProject.loading}
                    title="Eliminar proyecto"
                    context={`Se eliminará el proyecto ${name} y sus imágenes. Esta acción no se puede deshacer.`}
                />
            )}
        </ModalTrigger>
    );
};
