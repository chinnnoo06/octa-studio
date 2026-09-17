'use client';

import { FiPlus, FiTrash2 } from 'react-icons/fi';
import type { TBlogContentBlock } from '@/schemas/blogs/blogs.form.schemas';
import { Input } from '@/components/ui/form/Input';
import { Textarea } from '@/components/ui/form/Textarea';
import { SpanError } from '@/components/ui/form/SpanError';

type TBlockType = TBlogContentBlock['type'];

type TBlogContentFieldProps = {
    content: TBlogContentBlock[];
    onChange: (content: TBlogContentBlock[]) => void;
    error?: string;
};

const EMPTY: Record<TBlockType, TBlogContentBlock> = {
    paragraph: { type: 'paragraph', text: '' },
    heading: { type: 'heading', text: '', level: 2 },
    list: { type: 'list', ordered: false, items: [''] },
    quote: { type: 'quote', text: '', cite: '' },
};

const LABELS: Record<TBlockType, string> = {
    paragraph: 'Párrafo',
    heading: 'Encabezado',
    list: 'Lista',
    quote: 'Cita',
};

const ADD =
    'border-secondary/50 text-secondary hover:bg-secondary/15 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-4 py-2 text-xs transition-colors duration-300 lg:text-sm';

const TRASH =
    'text-fourth/75 shrink-0 cursor-pointer rounded p-1.5 transition-colors duration-300 hover:bg-red-600/10 hover:text-red-600';


export const BlogContentField = ({ content, onChange, error }: TBlogContentFieldProps) => {
    const add = (type: TBlockType) => onChange([...content, EMPTY[type]]);

    const removeAt = (index: number) => onChange(content.filter((_, i) => i !== index));

    const patch = (index: number, changes: Partial<TBlogContentBlock>) =>
        onChange(
            content.map((block, i) => (i === index ? ({ ...block, ...changes } as TBlogContentBlock) : block)),
        );

    return (
        <div className="flex flex-col gap-5">
            {content.map((block, i) => (
                <div key={i} className="border-secondary/30 flex flex-col gap-4 rounded-lg border p-4">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-secondary text-xs font-semibold uppercase">
                            {i + 1}. {LABELS[block.type]}
                        </span>

                        <button
                            type="button"
                            onClick={() => removeAt(i)}
                            aria-label={`Quitar el bloque ${i + 1}`}
                            className={TRASH}
                        >
                            <FiTrash2 aria-hidden="true" className="size-4" />
                        </button>
                    </div>

                    {block.type === 'paragraph' && (
                        <Textarea
                            rows={3}
                            placeholder="Texto del párrafo"
                            value={block.text}
                            onChange={(e) => patch(i, { text: e.target.value })}
                        />
                    )}

                    {block.type === 'heading' && (
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Input
                                placeholder="Texto del encabezado"
                                value={block.text}
                                onChange={(e) => patch(i, { text: e.target.value })}
                            />

                            {/* Solo 2 y 3: el `h1` es el título del blog. */}
                            <select
                                aria-label="Nivel del encabezado"
                                value={block.level}
                                onChange={(e) => patch(i, { level: Number(e.target.value) as 2 | 3 })}
                                className="border-secondary/50 text-fourth/75 focus:border-secondary hover:border-secondary w-full cursor-pointer rounded-lg border bg-white px-5 py-2.5 text-xs outline-none transition-all duration-300 sm:w-36 lg:text-sm"
                            >
                                <option value={2}>Nivel 2</option>
                                <option value={3}>Nivel 3</option>
                            </select>
                        </div>
                    )}

                    {block.type === 'list' && (
                        <div className="flex flex-col gap-4">
                            <label className="text-fourth/75 flex w-fit cursor-pointer items-center gap-2 text-xs lg:text-sm">
                                <input
                                    type="checkbox"
                                    checked={block.ordered}
                                    onChange={(e) => patch(i, { ordered: e.target.checked })}
                                    className="accent-secondary size-4 cursor-pointer"
                                />
                                Numerada
                            </label>

                            {block.items.map((item, j) => (
                                <div key={j} className="flex items-center gap-2">
                                    <Input
                                        placeholder={`Elemento ${j + 1}`}
                                        value={item}
                                        onChange={(e) =>
                                            patch(i, {
                                                items: block.items.map((it, k) => (k === j ? e.target.value : it)),
                                            })
                                        }
                                    />

                                    {block.items.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => patch(i, { items: block.items.filter((_, k) => k !== j) })}
                                            aria-label={`Quitar el elemento ${j + 1}`}
                                            className={TRASH}
                                        >
                                            <FiTrash2 aria-hidden="true" className="size-4" />
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => patch(i, { items: [...block.items, ''] })}
                                className={`${ADD} w-fit`}
                            >
                                <FiPlus aria-hidden="true" className="size-4" />
                                Elemento
                            </button>
                        </div>
                    )}

                    {block.type === 'quote' && (
                        <div className="flex flex-col gap-4">
                            <Textarea
                                rows={2}
                                placeholder="Texto de la cita"
                                value={block.text}
                                onChange={(e) => patch(i, { text: e.target.value })}
                            />

                            <Input
                                placeholder="Quién lo dijo (opcional)"
                                value={block.cite ?? ''}
                                onChange={(e) => patch(i, { cite: e.target.value })}
                            />
                        </div>
                    )}
                </div>
            ))}

            <div className="flex flex-wrap items-center gap-2.5">
                {(Object.keys(EMPTY) as TBlockType[]).map((type) => (
                    <button key={type} type="button" onClick={() => add(type)} className={ADD}>
                        <FiPlus aria-hidden="true" className="size-4" />
                        {LABELS[type]}
                    </button>
                ))}
            </div>

            <SpanError message={error} />
        </div>
    );
};
