"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Bot,
    Sparkles,
    Mic,
    Paperclip,
    Settings,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export default function AgentePage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Olá, Gabriel! Sou seu Agente MinhasFinanças. Como posso ajudar com seus investimentos ou saúde financeira hoje?',
            timestamp: '18:40'
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            // Chamada preparada para o backend Supabase
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg].map(m => ({
                        role: m.role,
                        content: m.content
                    }))
                }),
            });

            const data = await response.json();

            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.content || 'Ops, tive um problema ao processar sua mensagem.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, assistantMsg]);
        } catch (error) {
            console.error("Erro no chat:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-black max-w-md mx-auto relative overflow-hidden">
            {/* Header */}
            <header className="p-4 border-b border-white/5 bg-black/50 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center relative">
                        <Bot className="w-6 h-6 text-primary" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-white">Agente MinhasFinanças</h1>
                        <span className="text-[10px] text-primary/70 font-bold uppercase tracking-widest">IA Especializada</span>
                    </div>
                </div>
                <Link href="/settings">
                    <Button size="icon" variant="ghost" className="text-white/40 hover:text-white">
                        <Settings className="w-5 h-5" />
                    </Button>
                </Link>
            </header>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-hide pb-10">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={cn(
                                "max-w-[85%] flex flex-col gap-1",
                                msg.role === 'user' ? "self-end items-end" : "self-start items-start"
                            )}
                        >
                            <div className={cn(
                                "p-3 rounded-2xl text-sm leading-relaxed",
                                msg.role === 'user'
                                    ? "bg-primary text-black font-medium rounded-tr-none"
                                    : "bg-zinc-900 text-white rounded-tl-none border border-white/5"
                            )}>
                                {msg.content}
                            </div>
                            <span className="text-[9px] text-muted-foreground px-1">{msg.timestamp}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-gradient-to-t from-black via-black to-transparent pt-10 sticky bottom-0">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/20 rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-500" />
                    <div className="relative flex items-center gap-2 bg-zinc-900/80 border border-white/10 rounded-2xl p-2 pl-4">
                        <Button size="icon" variant="ghost" className="text-white/30 hover:text-white shrink-0">
                            <Paperclip className="w-5 h-5" />
                        </Button>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Pergunte sobre seus investimentos..."
                            className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-white/20 h-10 px-0"
                        />
                        <Button
                            size="icon"
                            onClick={handleSend}
                            className="bg-primary hover:bg-primary/80 text-black rounded-xl w-10 h-10 shrink-0 shadow-lg shadow-primary/20"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-white/40 border border-white/5 rounded-full px-3 py-1 bg-white/5">
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Llama 3 70B</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
