import { WhatsAppButton } from "@/components/ui/buttons/WhatsAppButton";
import { Footer } from "@/components/ui/footer/Footer";
import { Header } from "@/components/ui/header/Header";

export default function PublicLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Header />
            <main className="pt-18">{children}</main>
            <Footer />
            <WhatsAppButton />
        </>
    );
}
