"use client";

import { useLockBodyScroll } from "@/hooks/ui/useLockBodyScroll";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import { ActionButton } from "@/components/ui/buttons/ActionButton";

export type TConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  context: string;
  loading?: boolean;
};

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, context, loading = false }: TConfirmationModalProps) => {
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
      className="fixed inset-0 z-100 flex items-center justify-center px-4 backdrop-blur-sm bg-black/5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        className="max-w-xl w-full bg-primary rounded-lg shadow-lg p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col text-center">
          <h3
            id="confirmation-modal-title"
            className="text-secondary font-semibold text-lg lg:text-xl mb-4"
          >
            {title}
          </h3>

          <p className="text-[#1A1615]/75 text-sm lg:text-base mb-4">{context}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ActionButton
              variant="outline"
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-1/2"
            >
              <FaArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
              Cancelar
            </ActionButton>

            <ActionButton
              type="button"
              onClick={onConfirm}
              loading={loading}
              className="w-full sm:w-1/2"
            >
              <FaCheck className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
              {loading ? "Eliminando..." : "Confirmar"}
            </ActionButton>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
