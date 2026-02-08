"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    ArrowUpRight,
    Wallet,
    Globe,
    Coins,
    Plus,
    Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const assets = [
    { name: "Tesouro Selic 2029", type: "Renda Fixa", value: "45.000,00", change: "+0,9%", up: true, icon: Wallet },
    { name: "Bitcoin", type: "Cripto", value: "32.450,00", change: "+12,4%", up: true, icon: Coins },
    { name: "S&P 500 (IVVB11)", type: "Internacional", value: "28.120,00", change: "-1,2%", up: false, icon: Globe },
    { name: "Itaú (ITUB4)", type: "Ações", value: "15.650,00", change: "+2,1%", up: true, icon: TrendingUp },
];

export default function InvestimentosPage() {
    return (
        <div className="flex flex-col gap-6 p-4 pb-24 max-w-md mx-auto">
            <header className="flex justify-between items-center pt-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Carteira</h1>
                    <p className="text-muted-foreground text-sm">Resumo dos seus ativos</p>
                </div>
                <Button size="icon" variant="ghost" className="rounded-full bg-white/5 border border-white/10">
                    <Filter className="w-5 h-5 text-white/70" />
                </Button>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
                <Card className="bg-zinc-900/60 border-white/5 p-4 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Patrimônio</span>
                    <span className="text-lg font-bold text-white">R$ 145.230</span>
                </Card>
                <Card className="bg-zinc-900/60 border-white/5 p-4 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Rentabilidade</span>
                    <div className="flex items-center gap-1 text-primary font-bold text-lg">
                        <ArrowUpRight className="w-4 h-4" /> 18,5%
                    </div>
                </Card>
            </div>

            {/* Asset List */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Meus Ativos</h2>
                    <Button size="sm" variant="ghost" className="text-[10px] text-primary h-auto p-0 font-bold">+ ADICIONAR</Button>
                </div>

                {assets.map((asset, idx) => (
                    <motion.div
                        key={asset.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="bg-zinc-900/40 border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <asset.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white leading-none mb-1">{asset.name}</h3>
                                        <p className="text-[10px] text-muted-foreground font-medium uppercase">{asset.type}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-white">R$ {asset.value}</p>
                                    <p className={cn("text-[10px] font-bold", asset.up ? "text-primary" : "text-red-500/80")}>
                                        {asset.change}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Button className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-primary text-black shadow-lg shadow-primary/30 z-30 hov-glow">
                <Plus className="w-8 h-8 font-bold" />
            </Button>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
