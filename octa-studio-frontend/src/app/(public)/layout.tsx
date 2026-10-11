import { WhatsAppButton } from "@/components/ui/buttons/WhatsAppButton";
import { Footer } from "@/components/ui/layout/footer/Footer";
import { Header } from "@/components/ui/layout/header/Header";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { PostHogAnalytics } from "@/components/analytics/PostHogAnalytics";

export default function PublicLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {/* Solo el sitio publico se mide: el panel no carga ninguna analitica. */}
            <GoogleAnalytics />
            <PostHogAnalytics />
            <Header />
            <main className="pt-18">{children}</main>
            <Footer />
            <WhatsAppButton />
        </>
    );
}
