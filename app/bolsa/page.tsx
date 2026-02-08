"use client";

import { motion } from "framer-motion";
import {
    BarChart2,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    LayoutGrid,
    TrendingUp,
    History
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const watchlist = [
    { symbol: "PETR4", price: "37,42", change: "+1,2%", up: true },
    { symbol: "VALE3", price: "65,10", change: "-0,8%", up: false },
    { symbol: "BTC", price: "320.450", change: "+4,5%", up: true },
    { symbol: "IVVB11", price: "245,12", change: "+0,3%", up: true },
];

export default function BolsaPage() {
    return (
        <div className="flex flex-col gap-4 p-4 pb-24 max-w-md mx-auto">
            <header className="flex items-center justify-between pt-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Bolsa</h1>
                    <p className="text-muted-foreground text-sm">Mercado em tempo real</p>
                </div>
                <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="rounded-full border-white/10 bg-zinc-900/50">
                        <LayoutGrid className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="outline" className="rounded-full border-white/10 bg-zinc-900/50">
                        <Search className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            {/* Market Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                    placeholder="Buscar ticker (ex: ITUB4)..."
                    className="bg-zinc-900/50 border-white/10 pl-10 h-12 rounded-2xl focus-visible:ring-primary/30"
                />
            </div>

            {/* Main Index Cards */}
            <div className="grid grid-cols-2 gap-3">
                <Card className="bg-zinc-950 border-white/10">
                    <CardContent className="p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">IBOVESPA</span>
                        <span className="text-xl font-bold text-white">128.450</span>
                        <div className="flex items-center text-green-500 font-bold text-[10px]">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> +0,42%
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-950 border-white/10">
                    <CardContent className="p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">S&P 500</span>
                        <span className="text-xl font-bold text-white">5.120</span>
                        <div className="flex items-center text-green-500 font-bold text-[10px]">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> +0,15%
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Watchlist */}
            <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Favoritos</h2>
                    <Button variant="link" className="text-[10px] text-primary h-auto p-0 font-bold">VER TODOS</Button>
                </div>
                {watchlist.map((asset, idx) => (
                    <motion.div
                        key={asset.symbol}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <Card className="bg-zinc-900/40 border-white/5 hover:border-white/20 transition-all cursor-pointer">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                        <TrendingUp className={cn("w-5 h-5", asset.up ? "text-green-500" : "text-red-500")} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white">{asset.symbol}</h3>
                                        <p className="text-[10px] text-muted-foreground uppercase">Ativo Financeiro</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-white">R$ {asset.price}</p>
                                    <p className={cn("text-[10px] font-bold", asset.up ? "text-green-500" : "text-red-500")}>
                                        {asset.change}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Button className="w-full bg-black border border-primary/20 text-primary font-bold h-12 rounded-2xl hov-glow mt-4">
                <History className="w-5 h-5 mr-2" />
                VER HISTÓRICO COMPLETO
            </Button>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
