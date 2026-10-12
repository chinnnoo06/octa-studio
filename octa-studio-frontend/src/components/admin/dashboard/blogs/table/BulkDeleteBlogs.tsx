'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useBlog } from '@/hooks/useBlog';
import { BulkActionsBar } from '@/components/admin/ui/table/BulkActionsBar';

export const BulkDeleteBlogs = () => {
    const { deleteBlogs } = useBlog();

    useEffect(() => {
        if (deleteBlogs.error) toast.error(deleteBlogs.error);
        if (deleteBlogs.success) toast.success(deleteBlogs.success);
    }, [deleteBlogs.error, deleteBlogs.success]);

    return <BulkActionsBar onDelete={deleteBlogs.handleDeleteBlogs} loading={deleteBlogs.loading} />;
};
