'use client';

import { useEffect } from 'react';
import { registerBlogView } from '@/actions/blog/register-blog-view-action';

/** Suma una vista al articulo, una sola vez por sesion del navegador. */
export const BlogViewTracker = ({ slug }: { slug: string }) => {
    useEffect(() => {
        const key = `blog-view:${slug}`;

        try {
            if (sessionStorage.getItem(key)) return;
            sessionStorage.setItem(key, '1');
        } catch {
            // Sin sessionStorage (modo privado estricto) se cuenta igual.
        }

        registerBlogView(slug);
    }, [slug]);

    return null;
};
