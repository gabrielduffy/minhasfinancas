"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm"
            >
                <div className="flex flex-col items-center mb-8 gap-4">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center neon-glow">
                        <Wallet className="w-10 h-10 text-black" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">MinhasFinanças</h1>
                        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Premium Wealth Agent</p>
                    </div>
                </div>

                <div className="glass p-8 rounded-3xl border-white/5">
                    <Auth
                        supabaseClient={supabase}
                        appearance={{
                            theme: ThemeSupa,
                            variables: {
                                default: {
                                    colors: {
                                        brand: '#CCFF00',
                                        brandAccent: '#AAEE00',
                                        inputBackground: 'rgba(255,255,255,0.05)',
                                        inputText: 'white',
                                        inputBorder: 'rgba(255,255,255,0.1)',
                                        inputPlaceholder: '#666',
                                    },
                                    radii: {
                                        borderRadiusButton: '12px',
                                        buttonPadding: '12px',
                                        inputPadding: '12px',
                                    }
                                }
                            }
                        }}
                        providers={['github', 'google']}
                        redirectTo={typeof window !== 'undefined' ? window.location.origin : ''}
                        localization={{
                            variables: {
                                sign_in: {
                                    email_label: 'E-mail',
                                    password_label: 'Senha',
                                    button_label: 'Entrar agora',
                                    loading_button_label: 'Entrando...',
                                    social_provider_text: 'Entrar com {{provider}}',
                                    link_text: 'Já tem uma conta? Entre',
                                },
                                sign_up: {
                                    email_label: 'E-mail',
                                    password_label: 'Crie uma senha',
                                    button_label: 'Criar conta',
                                    loading_button_label: 'Criando...',
                                    link_text: 'Não tem conta? Cadastre-se',
                                }
                            }
                        }}
                        theme="dark"
                    />
                </div>

                <p className="text-center text-[10px] text-muted-foreground mt-8 uppercase tracking-tighter">
                    Segurança Bancária & Criptografia Ponta-a-Ponta
                </p>
            </motion.div>
        </div>
    );
}
