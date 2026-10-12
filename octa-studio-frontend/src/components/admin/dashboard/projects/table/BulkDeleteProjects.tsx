'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useProject } from '@/hooks/useProject';
import { BulkActionsBar } from '@/components/admin/ui/table/BulkActionsBar';

export const BulkDeleteProjects = () => {
    const { deleteProjects } = useProject();

    useEffect(() => {
        if (deleteProjects.error) toast.error(deleteProjects.error);
        if (deleteProjects.success) toast.success(deleteProjects.success);
    }, [deleteProjects.error, deleteProjects.success]);

    return <BulkActionsBar onDelete={deleteProjects.handleDeleteProjects} loading={deleteProjects.loading} />;
};
