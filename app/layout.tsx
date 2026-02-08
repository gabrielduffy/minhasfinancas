import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MinhasFinanças",
    description: "Gerenciador financeiro pessoal focado em investimentos",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className="dark">
            <body className={`${sora.className} antialiased selection:bg-primary selection:text-black bg-black`}>
                <main className="min-h-screen pb-24">
                    {children}
                </main>
                <BottomNav />
            </body>
        </html>
    );
}
