import Image from "next/image"
import Img from "@/assets/media/brand/ImgWhiteLogo.webp"

export const Logo = ({ sizes }: { sizes: string }) => {
    return (
        <Image
            src={Img}
            alt="Logo Octa Studio"
            sizes={sizes}
            priority
            className="w-full h-auto"
        />
    )
}
