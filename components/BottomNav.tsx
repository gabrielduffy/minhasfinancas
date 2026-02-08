"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    TrendingUp,
    BarChart3,
    UserCircle2,
    LineChart,
    MessageSquareCode
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Investimentos", icon: TrendingUp, href: "/" },
    { label: "Bolsa", icon: BarChart3, href: "/bolsa" },
    { label: "Eu", icon: UserCircle2, href: "/eu" },
    { label: "Análises", icon: LineChart, href: "/analises" },
    { label: "Agente", icon: MessageSquareCode, href: "/agente" },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/10 px-2 pb-safe-area-inset-bottom">
            <div className="flex justify-around items-center h-16 max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 transition-all duration-300 min-w-[64px]",
                                isActive ? "text-primary scale-110" : "text-white/40 hover:text-white/60"
                            )}
                        >
                            <div className={cn(
                                "p-1.5 rounded-xl transition-all duration-300",
                                isActive && "bg-primary/10 neon-glow"
                            )}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-tighter">
                                {item.label}
                            </span>
                            {isActive && (
                                <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full neon-glow" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
