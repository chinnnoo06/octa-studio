import Image from "next/image"
import Img from "@/assets/media/brand/ImgWhiteLogo.webp"

/**
 * Va sin optimizar: Next lo recortaba a 96px para el header y las letras finas
 * se pixelaban. El original (719px, 65 KB) lo reduce el navegador con nitidez.
 */
export const Logo = () => {
    return (
        <Image
            src={Img}
            alt="Logo Octa Building Studio"
            unoptimized
            priority
            className="w-full h-auto"
        />
    )
}
