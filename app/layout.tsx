// MinhasFinanças - Versão Final de Integração 1.0.1
"use client";

import { Sora } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { usePathname, useRouter } from "next/navigation";

const sora = Sora({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
            if (!session && pathname !== '/login') {
                router.push('/login');
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (!session && pathname !== '/login') {
                router.push('/login');
            } else if (session && pathname === '/login') {
                router.push('/');
            }
        });

        return () => subscription.unsubscribe();
    }, [pathname, router]);

    if (loading && pathname !== '/login') {
        return (
            <html lang="pt-BR" className="dark">
                <body className="bg-black min-h-screen flex items-center justify-center text-primary">
                    <div className="animate-pulse font-bold tracking-widest uppercase text-xs">Acessando Cofre...</div>
                </body>
            </html>
        );
    }

    return (
        <html lang="pt-BR" className="dark">
            <body className={`${sora.className} antialiased selection:bg-primary selection:text-black bg-black`}>
                <main className="min-h-screen pb-24">
                    {children}
                </main>
                {session && <BottomNav />}
            </body>
        </html>
    );
}
