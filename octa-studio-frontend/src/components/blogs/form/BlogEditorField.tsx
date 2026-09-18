'use client';

import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/form/Label';
import { SpanError } from '@/components/ui/form/SpanError';

// TinyMCE toca `window` al importarse: solo en cliente, y con hueco mientras carga.
const BlogEditor = dynamic(() => import('./BlogEditor').then((m) => m.BlogEditor), {
    ssr: false,
    loading: () => (
        <div aria-busy="true" className="border-secondary/50 h-100 w-full animate-pulse rounded-lg border bg-white" />
    ),
});

type TBlogEditorFieldProps = {
    value: string;
    onChange: (html: string) => void;
    error?: string;
};

export const BlogEditorField = ({ value, onChange, error }: TBlogEditorFieldProps) => {
    return (
        <div className="form-group">
            <Label htmlFor="content">Contenido</Label>
            <BlogEditor id="content" value={value} onChange={onChange} />
            <SpanError message={error} />
        </div>
    );
};
