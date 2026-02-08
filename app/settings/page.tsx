"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Save,
    Bot,
    Sparkles,
    Settings2,
    ShieldCheck,
    Zap,
    Globe
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function SettingsPage() {
    const [prompt, setPrompt] = useState(
        "Você é o Agente MinhasFinanças, um consultor de elite em investimentos. Seu objetivo é monitorar minha carteira na XP e em cripto e me manter informado via WhatsApp e Dashboard..."
    );

    return (
        <div className="flex flex-col gap-6 p-4 pb-20 max-w-md mx-auto min-h-screen pt-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-2">
                <Link href="/">
                    <Button size="icon" variant="ghost" className="rounded-full text-white/50 hover:text-white hover:bg-white/10">
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white leading-tight">Configurações</h1>
                    <p className="text-muted-foreground text-sm">Personalize seu agente de IA</p>
                </div>
            </div>

            {/* Agente IA Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <Card className="border-primary/20 bg-zinc-950/50 backdrop-blur-sm overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Bot className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Prompt Mestre</CardTitle>
                                <CardDescription>Defina as regras e personalidade do agente</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                            <Textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="relative min-h-[300px] bg-black/50 border-white/10 focus-visible:ring-primary/50 font-mono text-sm leading-relaxed p-4 rounded-xl"
                                placeholder="Escreva as diretrizes do seu consultor..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-zinc-900/50 border border-white/5 flex flex-col gap-1">
                                <ShieldCheck className="w-4 h-4 text-primary opacity-70" />
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Foco</span>
                                <span className="text-xs text-white">XP & Cripto</span>
                            </div>
                            <div className="p-3 rounded-lg bg-zinc-900/50 border border-white/5 flex flex-col gap-1">
                                <Zap className="w-4 h-4 text-primary opacity-70" />
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Modelo</span>
                                <span className="text-xs text-white">Llama 3 70B</span>
                            </div>
                        </div>

                        <Button className="w-full bg-primary text-black font-bold h-12 rounded-xl hov-glow">
                            <Save className="w-5 h-5 mr-2" />
                            Salvar Alterações
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Outras Configurações */}
            <div className="flex flex-col gap-3">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Conexões</h2>
                <Card className="border-white/5 bg-zinc-900/40 divide-y divide-white/5">
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-white/70" />
                            <span className="text-sm font-medium">Supabase</span>
                        </div>
                        <div className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold">Conectado</div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-white/70" />
                            <span className="text-sm font-medium">Uazapi (WhatsApp)</span>
                        </div>
                        <div className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold">Conectado</div>
                    </div>
                </Card>
            </div>

            <div className="mt-auto pt-8 flex justify-center opacity-30">
                <div className="flex items-center gap-2">
                    <Settings2 className="w-4 h-4" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">MinhasFinanças v1.0</span>
                </div>
            </div>
        </div>
    );
}
