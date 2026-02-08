"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck,
    TrendingUp,
    Search,
    ClipboardList,
    Building2,
    FileSearch,
    Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
    { id: 'cpf', title: 'Consulta CPF', icon: Search, desc: 'Verifique se há pendências no seu documento.' },
    { id: 'score', title: 'Score Financeiro', icon: Zap, desc: 'Acompanhe sua pontuação de crédito em tempo real.' },
    { id: 'process', title: 'Processos Judiciais', icon: FileSearch, desc: 'Busca por processos em seu nome ou empresa.' },
    { id: 'rating', title: 'Rating Bancário', icon: Building2, desc: 'Como os bancos enxergam seu perfil de crédito.' },
];

export default function EuPage() {
    return (
        <div className="flex flex-col gap-6 p-4 pb-24 max-w-md mx-auto animate-in fade-in duration-500">
            <header className="pt-4">
                <h1 className="text-2xl font-bold text-white mb-1">Nome Saudável</h1>
                <p className="text-muted-foreground text-sm">Monitoramento de CPF, Score e Rating</p>
            </header>

            {/* Score Hero Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card className="bg-gradient-to-br from-zinc-900 to-black border-primary/20 neon-border overflow-hidden">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Meu Score</span>
                            <ShieldCheck className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white">845</span>
                            <span className="text-primary font-bold text-sm">Excelente</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-4">
                            <motion.div
                                className="h-full bg-primary neon-glow"
                                initial={{ width: 0 }}
                                animate={{ width: "84.5%" }}
                                transition={{ delay: 0.5, duration: 1 }}
                            />
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            Seu score é superior a 92% da população brasileira. Continue com bons hábitos financeiros!
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-3">
                {features.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="bg-zinc-900/40 border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
                            <CardHeader className="p-4 flex flex-col items-center text-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <item.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-white">{item.title}</h3>
                                    <p className="text-[9px] text-muted-foreground mt-1 line-clamp-2">{item.desc}</p>
                                </div>
                            </CardHeader>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                        <ClipboardList className="w-6 h-6 text-black" />
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-white">Consolidar Perfil</h4>
                        <p className="text-[10px] text-muted-foreground">O Agente pode analisar seus dados para melhorar seu rating.</p>
                    </div>
                    <Button size="sm" className="ml-auto bg-primary text-black font-bold text-[10px] h-8">
                        ANALISAR
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
