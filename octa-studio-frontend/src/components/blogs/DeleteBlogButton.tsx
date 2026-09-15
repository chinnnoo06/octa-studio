'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useBlogs } from '@/hooks/blogs/useBlogs';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { ModalTrigger } from '@/components/ui/ModalTrigger';
import { DeleteButton } from '@/components/ui/buttons/DeleteButton';

type TDeleteBlogButtonProps = {
    id: string;
    /** El titulo del blog: sale en la etiqueta accesible y en el modal. */
    name: string;
};

export const DeleteBlogButton = ({ id, name }: TDeleteBlogButtonProps) => {
    const { deleteBlog } = useBlogs();

    useEffect(() => {
        if (deleteBlog.error) toast.error(deleteBlog.error);
        if (deleteBlog.success) toast.success(deleteBlog.success);
    }, [deleteBlog.error, deleteBlog.success]);

    return (
        <ModalTrigger
            renderTrigger={(onOpen) => (
                <DeleteButton onClick={onOpen} label={`Eliminar el blog ${name}`} />
            )}
        >
            {(onClose, isOpen) => (
                <ConfirmationModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onConfirm={async () => {
                        await deleteBlog.handleDeleteBlog(id);
                        onClose();
                    }}
                    loading={deleteBlog.loading}
                    title="Eliminar blog"
                    context={`Se eliminará el blog ${name} y sus imágenes. Esta acción no se puede deshacer.`}
                />
            )}
        </ModalTrigger>
    );
};
