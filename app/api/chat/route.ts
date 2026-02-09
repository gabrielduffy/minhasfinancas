import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // 1. Buscar contexto dos investimentos para a IA ser precisa
        const { data: investments } = await supabase
            .from('investments')
            .select('*');

        const portfolioSummary = investments?.map(inv =>
            `- ${inv.name}: R$ ${(inv.quantity * (inv.current_price || inv.average_price)).toLocaleString('pt-BR')}`
        ).join('\n') || "Sem investimentos no momento.";

        // 2. Groq API Call
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama3-70b-8192',
                messages: [
                    {
                        role: 'system',
                        content: `Você é o Agente MinhasFinanças. 
                        Dados atuais do usuário:
                        ${portfolioSummary}
                        
                        Ajude o usuário com análises de carteira, sugestões de aporte e reequilíbrio.`
                    },
                    ...messages
                ],
                temperature: 0.7,
            })
        });

        const data = await response.json();
        const content = data.choices[0]?.message?.content || "Não consegui processar sua resposta.";

        return NextResponse.json({ content });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
