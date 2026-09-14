"use client";

import { ReactNode, useState } from "react";

export type TModalTriggerProps = {
  /** El elemento que abre el modal; recibe el abridor. */
  renderTrigger: (onOpen: () => void) => ReactNode;
  /** El modal; recibe el cerrador y si está abierto. */
  children: (onClose: () => void, isOpen: boolean) => ReactNode;
};

/** Guarda el abierto/cerrado para que el modal y su disparador no tengan que compartirlo. */
export const ModalTrigger = ({ renderTrigger, children }: TModalTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {renderTrigger(() => setIsOpen(true))}
      {children(() => setIsOpen(false), isOpen)}
    </>
  );
};
