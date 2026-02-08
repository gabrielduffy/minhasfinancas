"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    Wallet,
    PieChart as PieChartIcon,
    ArrowUpRight,
    Bitcoin
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const allocationData = [
    { name: "Renda Fixa", value: 40, color: "#CCFF00" },
    { name: "Variável", value: 30, color: "#888888" },
    { name: "Bitcoin", value: 20, color: "#F7931A" },
    { name: "Internacional", value: 10, color: "#0070f3" },
];

const insights = [
    {
        title: "Oportunidade em BTC",
        description: "Bitcoin caiu 5% nas últimas 2h sem mudança nos fundamentos. Sugiro pequeno aporte.",
        icon: Bitcoin,
        time: "Hoje, 14:20"
    },
    {
        title: "Reequilíbrio de Carteira",
        description: "Sua alocação em Renda Variável subiu para 32%. Considere realizar lucro parcial.",
        icon: TrendingUp,
        time: "Hoje, 09:00"
    }
];

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6 p-4 pb-24 max-w-md mx-auto animate-in fade-in duration-700">
            {/* Header */}
            <div className="pt-4">
                <h1 className="text-2xl font-bold text-white leading-tight">Olá, Gabriel</h1>
                <p className="text-muted-foreground text-sm">Status da sua carteira hoje</p>
            </div>

            {/* Patrimônio Total Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="relative overflow-hidden border-primary/30 bg-black/40 backdrop-blur-xl neon-glow animate-neon-pulse">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Wallet className="w-20 h-20 text-primary" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-primary/70 font-medium tracking-wider uppercase text-xs">Patrimônio Total</CardDescription>
                        <CardTitle className="text-4xl font-extrabold text-white">R$ 145.230,00</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-primary font-semibold">
                            <TrendingUp className="w-4 h-4" />
                            <span>+12.4% este mês</span>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Alocação Chart Area */}
            <Card className="border-white/5 bg-zinc-950/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                        <PieChartIcon className="w-4 h-4 text-primary" />
                        Alocação de Ativos
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                    <div className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={allocationData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={75}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {allocationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {allocationData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-[10px] text-muted-foreground font-bold uppercase">{item.name}</span>
                                <span className="text-[10px] font-bold text-white ml-auto">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Insights Rápidos */}
            <div className="flex flex-col gap-3">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Resumo do Dia</h2>

                {insights.map((insight, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="border-white/5 bg-zinc-900/40">
                            <CardContent className="p-4 flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <insight.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex flex-col gap-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-bold text-xs text-white truncate">{insight.title}</h3>
                                        <span className="text-[9px] text-muted-foreground shrink-0">{insight.time}</span>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
                                        {insight.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
