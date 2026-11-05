import { useEffect } from "react";

let lockCount = 0;

export const useLockBodyScroll = (locked: boolean = true) => {
  useEffect(() => {
    if (!locked) return;

    lockCount++;
    const html = document.documentElement;
    html.style.overflow = "hidden";

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        html.style.overflow = "";
      }
    };
  }, [locked]);
};