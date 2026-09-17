import { WhatsAppButton } from "@/components/ui/buttons/WhatsAppButton";
import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";

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
