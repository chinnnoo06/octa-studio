'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useBlogCategory } from '@/hooks/useBlogCategory';
import { BulkActionsBar } from '@/components/ui/table/BulkActionsBar';

export const BulkDeleteBlogCategories = () => {
    const { deleteBlogCategories } = useBlogCategory();

    useEffect(() => {
        if (deleteBlogCategories.error) toast.error(deleteBlogCategories.error);
        if (deleteBlogCategories.success) toast.success(deleteBlogCategories.success);
    }, [deleteBlogCategories.error, deleteBlogCategories.success]);

    return <BulkActionsBar onDelete={deleteBlogCategories.handleDeleteBlogCategories} loading={deleteBlogCategories.loading} />;
};
