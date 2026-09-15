'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useTestimonials } from '@/hooks/testimonials/useTestimonials';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { ModalTrigger } from '@/components/ui/ModalTrigger';
import { DeleteButton } from '@/components/ui/buttons/DeleteButton';
import { TTestiomonial } from '@/schemas/testimonials/testimonials.schemas';

type TDeleteTestimonialButtonProps = {
    id: TTestiomonial['_id'];
    name: string;
};

export const DeleteTestimonialButton = ({ id, name }: TDeleteTestimonialButtonProps) => {
    const { deleteTestimonial } = useTestimonials();

    useEffect(() => {
        if (deleteTestimonial.error) toast.error(deleteTestimonial.error);
        if (deleteTestimonial.success) toast.success(deleteTestimonial.success);
    }, [deleteTestimonial.error, deleteTestimonial.success]);

    return (
        <ModalTrigger
            renderTrigger={(onOpen) => (
                <DeleteButton
                    onClick={onOpen}
                    label={`Eliminar el testimonio de ${name}`}
                />
            )}
        >
            {(onClose, isOpen) => (
                <ConfirmationModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onConfirm={async () => {
                        await deleteTestimonial.handleDeleteTestimonial(id);
                        onClose();
                    }}
                    loading={deleteTestimonial.loading}
                    title="Eliminar testimonio"
                    context={`Se eliminará el testimonio de ${name}. Esta acción no se puede deshacer.`}
                />
            )}
        </ModalTrigger>
    );
};
