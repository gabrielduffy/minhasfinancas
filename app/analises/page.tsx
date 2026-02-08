"use client";

import { motion } from "framer-motion";
import {
    PieChart as PieChartIcon,
    BarChart,
    TrendingUp,
    AlertCircle,
    Sparkles,
    Zap,
    Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AnalisesPage() {
    return (
        <div className="flex flex-col gap-6 p-4 pb-24 max-w-md mx-auto">
            <header className="pt-4">
                <h1 className="text-2xl font-bold text-white">Análises</h1>
                <p className="text-muted-foreground text-sm">Inteligência aplicada à sua carteira</p>
            </header>

            {/* AI Health Check */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <Card className="bg-zinc-900 border-primary/30 neon-border overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-2">
                        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-lg">Health Check da Carteira</CardTitle>
                        <CardDescription className="text-primary font-bold">Nota: 8.5/10</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                                <span>Diversificação</span>
                                <span className="text-white">Forte</span>
                            </div>
                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[90%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                                <span>Risco</span>
                                <span className="text-white">Moderado</span>
                            </div>
                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 w-[45%]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Insights Section */}
            <div className="flex flex-col gap-3">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Oportunidades IA</h2>

                <Card className="bg-zinc-900 border-white/5">
                    <CardContent className="p-4 flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-6 h-6 text-orange-500" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h4 className="text-sm font-bold text-white leading-tight">Rebalanceamento Necessário</h4>
                            <p className="text-[10px] text-muted-foreground leading-relaxed">Sua exposição em BDRs ultrapassou o limite de 15%. Sugerimos vender IVVB11 para manter o alvo.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-white/5">
                    <CardContent className="p-4 flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Target className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h4 className="text-sm font-bold text-white leading-tight">Alvo de Preço Alcançado</h4>
                            <p className="text-[10px] text-muted-foreground leading-relaxed">Bitcoin atingiu R$ 320k. Considere realizar lucro parcial de 10% da posição.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Button className="w-full bg-primary text-black font-bold h-12 rounded-2xl hov-glow mt-2">
                <Zap className="w-5 h-5 mr-2" />
                GERAR RELATÓRIO PDF
            </Button>
        </div>
    );
}
