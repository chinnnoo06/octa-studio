import { useEffect, useRef, useState } from "react";

export const useHeader = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const hamburgerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 1024px)")

        const handleChange = () => {
            if (media.matches) {
                setMenuVisible(false)
            }
        }

        media.addEventListener("change", handleChange)

        return () => {
            media.removeEventListener("change", handleChange)
        }
    }, [])

    const toggleMenu = () => {
        setMenuVisible(v => !v)
    }

    return {
        menuVisible,
        hamburgerRef,
        actions: {
            toggleMenu,
        },
    }
}