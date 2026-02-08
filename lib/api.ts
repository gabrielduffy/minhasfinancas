import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export async function askAgent(messages: ChatMessage[]) {
    const { data, error } = await supabase.functions.invoke('ai-agent', {
        body: { messages },
    });

    if (error) throw error;
    return data;
}

export async function getMarketData(symbols: string[]) {
    // Aqui integraremos com a Brapi ou Alpha Vantage em Live
    // Por enquanto retornamos o mock estruturado para a integração
    return symbols.map(s => ({
        symbol: s,
        price: Math.random() * 100,
        change: (Math.random() * 4 - 2).toFixed(2)
    }));
}
