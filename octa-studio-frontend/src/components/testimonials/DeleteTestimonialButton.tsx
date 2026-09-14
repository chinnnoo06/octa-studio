'use client';

import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { deleteTestimonial } from '@/actions/testimonials/delete-testimonial-action';
import { useActionStatus } from '@/hooks/ui/useActionStatus';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { ModalTrigger } from '@/components/ui/ModalTrigger';

type TDeleteTestimonialButtonProps = {
    id: string;
    name: string;
};

export const DeleteTestimonialButton = ({ id, name }: TDeleteTestimonialButtonProps) => {
    const { loading, startLoading, stopLoading } = useActionStatus();

    const onConfirm = async (onClose: () => void) => {
        startLoading();
        const res = await deleteTestimonial(id);
        stopLoading();
        onClose();

        if (res?.error) toast.error(res.error);
        else if (res?.success) toast.success(res.success);
    };

    return (
        <ModalTrigger
            renderTrigger={(onOpen) => (
                <button
                    type="button"
                    onClick={onOpen}
                    aria-label={`Eliminar el testimonio de ${name}`}
                    className="text-fourth/75 inline-flex cursor-pointer items-center justify-center rounded-lg p-2 transition-colors duration-300 hover:bg-red-600/10 hover:text-red-600"
                >
                    <FiTrash2 aria-hidden="true" className="size-4.5" />
                </button>
            )}
        >
            {(onClose, isOpen) => (
                <ConfirmationModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onConfirm={() => onConfirm(onClose)}
                    loading={loading}
                    title="Eliminar testimonio"
                    context={`Se eliminará el testimonio de ${name}. Esta acción no se puede deshacer.`}
                />
            )}
        </ModalTrigger>
    );
};
