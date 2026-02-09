"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    ArrowUpRight,
    Wallet,
    Globe,
    Coins,
    Plus,
    Filter,
    Loader2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function InvestimentosPage() {
    const { investments, totalPatrimony, loading } = usePortfolio();

    const getIcon = (category: string) => {
        if (category.includes('Internacional')) return Globe;
        if (category.includes('Cripto') || category.includes('Bitcoin')) return Coins;
        if (category.includes('Renda Fixa')) return Wallet;
        return TrendingUp;
    };

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
                <Card className="bg-zinc-900/60 border-white/5 p-4 flex flex-col gap-1 text-center">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Patrimônio</span>
                    <span className="text-lg font-bold text-white">
                        {loading ? "..." : `R$ ${totalPatrimony.toLocaleString('pt-BR')}`}
                    </span>
                </Card>
                <Card className="bg-zinc-900/60 border-white/5 p-4 flex flex-col gap-1 text-center">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Ativos</span>
                    <span className="text-lg font-bold text-white">{investments.length} Ativos</span>
                </Card>
            </div>

            {/* Asset List */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Meus Ativos</h2>
                    <Button size="sm" variant="ghost" className="text-[10px] text-primary h-auto p-0 font-bold">+ ADICIONAR</Button>
                </div>

                {loading ? (
                    <div className="flex justify-center p-10">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                ) : (
                    investments.map((asset, idx) => {
                        const Icon = getIcon(asset.category);
                        const assetValue = asset.quantity * (asset.current_price || asset.average_price);

                        return (
                            <motion.div
                                key={asset.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Card className="bg-zinc-900/40 border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-white leading-none mb-1">{asset.name}</h3>
                                                <p className="text-[10px] text-muted-foreground font-medium uppercase">{asset.category}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-white">R$ {assetValue.toLocaleString('pt-BR')}</p>
                                            <p className="text-[10px] text-muted-foreground">{asset.quantity} un.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })
                )}

                {!loading && investments.length === 0 && (
                    <div className="text-center p-10 border border-dashed border-white/10 rounded-2xl">
                        <p className="text-sm text-muted-foreground italic">Nenhum investimento encontrado.</p>
                    </div>
                )}
            </div>

            <Button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-primary text-black shadow-lg shadow-primary/30 z-30 hov-glow">
                <Plus className="w-8 h-8 font-bold" />
            </Button>
        </div>
    );
}
