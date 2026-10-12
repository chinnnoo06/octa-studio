'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { FaCheck, FaMinus } from 'react-icons/fa6';

type TBulkSelection = {
    ids: string[];
    selected: string[];
    isSelected: (id: string) => boolean;
    toggle: (id: string) => void;
    toggleAll: () => void;
    clear: () => void;
};

const BulkSelectionContext = createContext<TBulkSelection | null>(null);

export const useBulkSelection = () => {
    const ctx = useContext(BulkSelectionContext);
    if (!ctx) throw new Error('useBulkSelection va dentro de <BulkSelectionProvider>');
    return ctx;
};

/**
 * Guarda que filas estan marcadas en la pagina actual del listado. La tabla
 * (escritorio), las tarjetas (movil) y la barra flotante leen el mismo estado.
 */
export const BulkSelectionProvider = ({ ids, children }: { ids: string[]; children: ReactNode }) => {
    const [picked, setPicked] = useState<string[]>([]);

    // Al cambiar de pagina o filtro, lo marcado que ya no esta en pantalla se descarta.
    const selected = useMemo(() => picked.filter((id) => ids.includes(id)), [picked, ids]);

    const value: TBulkSelection = {
        ids,
        selected,
        isSelected: (id) => selected.includes(id),
        toggle: (id) => setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
        toggleAll: () => setPicked(selected.length === ids.length ? [] : ids),
        clear: () => setPicked([]),
    };

    return <BulkSelectionContext.Provider value={value}>{children}</BulkSelectionContext.Provider>;
};

type TCheckboxProps = {
    checked: boolean;
    indeterminate?: boolean;
    onChange: () => void;
    label: string;
    /** Marca el input con `bulk-select`: la fila o tarjeta que lo contiene se tinta al marcarlo. */
    rowMarker?: boolean;
};

/** Checkbox cuadrado con el color de marca. */
const Checkbox = ({ checked, indeterminate = false, onChange, label, rowMarker = false }: TCheckboxProps) => (
    <span className="relative inline-flex size-4.5 shrink-0 align-middle">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            aria-label={label}
            aria-checked={indeterminate ? 'mixed' : checked}
            className={`bg-primary-admin hover:border-secondary-admin checked:border-secondary-admin checked:bg-secondary-admin focus-visible:outline-secondary-admin size-4.5 cursor-pointer appearance-none rounded-[4px] border-[1.5px] border-fourth-admin/30 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${indeterminate ? 'border-secondary-admin bg-secondary-admin' : ''} ${rowMarker ? 'bulk-select' : ''}`}
        />
        {(checked || indeterminate) && (
            <span aria-hidden="true" className="text-primary-admin pointer-events-none absolute inset-0 flex items-center justify-center">
                {indeterminate && !checked ? <FaMinus className="size-2.5" /> : <FaCheck className="size-2.5" />}
            </span>
        )}
    </span>
);

export const BulkSelectAll = () => {
    const { ids, selected, toggleAll } = useBulkSelection();

    const all = ids.length > 0 && selected.length === ids.length;
    const some = selected.length > 0 && !all;

    return <Checkbox checked={all} indeterminate={some} onChange={toggleAll} label="Seleccionar todos" />;
};

export const BulkCheckbox = ({ id, label }: { id: string; label: string }) => {
    const { isSelected, toggle } = useBulkSelection();

    return <Checkbox checked={isSelected(id)} onChange={() => toggle(id)} label={label} rowMarker />;
};
