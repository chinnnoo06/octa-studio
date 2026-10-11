"use client";

import { useLockBodyScroll } from "@/hooks/ui/useLockBodyScroll";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

export type TConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  context: ReactNode;
  loading?: boolean;
  confirmLabel?: string;
};

const BUTTON =
  "cursor-pointer rounded-[7px] px-4.5 py-2.5 text-[13px] font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  context,
  loading = false,
  confirmLabel = "Eliminar",
}: TConfirmationModalProps) => {
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-120 flex items-center justify-center bg-slate-900/55 p-3.75 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        className="bg-primary w-full max-w-[460px] rounded-[12px] p-6.25 shadow-[0_24px_64px_rgba(0,0,0,0.25)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="confirmation-modal-title" className="text-ink mb-2.5 text-[19px] font-semibold">
          {title}
        </h3>

        <p className="mb-5 text-[14px] leading-[1.55] text-gray-600">{context}</p>

        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={`${BUTTON} text-ink bg-slate-100 hover:bg-slate-200`}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            aria-busy={loading}
            className={`${BUTTON} text-primary bg-red-700 hover:bg-red-800`}
          >
            {loading ? "Eliminando..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
