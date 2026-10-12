'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useBlogCategory } from '@/hooks/useBlogCategory';
import { ConfirmationModal } from '@/components/admin/ui/ConfirmationModal';
import { ModalTrigger } from '@/components/admin/ui/ModalTrigger';
import { DeleteButton } from '@/components/admin/ui/buttons/DeleteButton';

type TDeleteBlogCategoryButtonProps = {
    id: string;
    /** El nombre de la categoria: sale en la etiqueta accesible y en el modal. */
    name: string;
};

export const DeleteBlogCategoryButton = ({ id, name }: TDeleteBlogCategoryButtonProps) => {
    const { deleteBlogCategory } = useBlogCategory();

    useEffect(() => {
        if (deleteBlogCategory.error) toast.error(deleteBlogCategory.error);
        if (deleteBlogCategory.success) toast.success(deleteBlogCategory.success);
    }, [deleteBlogCategory.error, deleteBlogCategory.success]);

    return (
        <ModalTrigger
            renderTrigger={(onOpen) => (
                <DeleteButton onClick={onOpen} label={`Eliminar la categoría ${name}`} />
            )}
        >
            {(onClose, isOpen) => (
                <ConfirmationModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onConfirm={async () => {
                        await deleteBlogCategory.handleDeleteBlogCategory(id);
                        onClose();
                    }}
                    loading={deleteBlogCategory.loading}
                    title="Confirmar eliminación"
                    context={`¿Estás seguro de eliminar la categoría ${name}? Sus entradas quedarán sin categoría.`}
                />
            )}
        </ModalTrigger>
    );
};
