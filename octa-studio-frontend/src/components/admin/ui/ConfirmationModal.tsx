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
  "cursor-pointer rounded-xl hover:shadow-lg px-5 py-2.5 text-xs lg:text-sm font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none";

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
      className="fixed inset-0 z-120 flex items-center justify-center bg-fourth-admin/55 p-5 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        className="bg-primary-admin w-full max-w-[460px] rounded-xl p-5 shadow-[0_24px_64px_color-mix(in_srgb,var(--color-fourth-admin)_25%,transparent)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="confirmation-modal-title" className="text-fourth-admin mb-2.5 text-lg lg:text-xl font-semibold">
          {title}
        </h3>

        <p className="mb-5 text-sm lg:text-base leading-[1.55] text-fourth-admin/75">{context}</p>

        <div className="flex flex-wrap justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={`${BUTTON} text-fourth-admin bg-thrird-admin hover:bg-fourth-admin/10`}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            aria-busy={loading}
            className={`${BUTTON} text-primary-admin bg-red-700 hover:bg-red-800`}
          >
            {loading ? "Eliminando..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
