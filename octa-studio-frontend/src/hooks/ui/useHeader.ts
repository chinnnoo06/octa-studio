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

    useEffect(() => {
        if (menuVisible) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                document.body.style.overflow = "";
                window.scrollTo(0, scrollY);
            };
        }
    }, [menuVisible]);

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