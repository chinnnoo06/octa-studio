'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useTestimonial } from '@/hooks/useTestimonial';
import { BulkActionsBar } from '@/components/admin/ui/table/BulkActionsBar';

export const BulkDeleteTestimonials = () => {
    const { deleteTestimonials } = useTestimonial();

    useEffect(() => {
        if (deleteTestimonials.error) toast.error(deleteTestimonials.error);
        if (deleteTestimonials.success) toast.success(deleteTestimonials.success);
    }, [deleteTestimonials.error, deleteTestimonials.success]);

    return <BulkActionsBar onDelete={deleteTestimonials.handleDeleteTestimonials} loading={deleteTestimonials.loading} />;
};
