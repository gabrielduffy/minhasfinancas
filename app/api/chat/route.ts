import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Aqui você conectaria com o Supabase Edge Function ou direto com a Groq API
        // Para rodar em LIVE, você usaria o GROQ_API_KEY do seu dashboard
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama3-70b-8192',
                messages: [
                    { role: 'system', content: 'Você é o Agente MinhasFinanças, especialista em investimentos e saúde financeira. Responda de forma concisa e técnica.' },
                    ...messages
                ],
                temperature: 0.7,
            })
        });

        const data = await response.json();
        const content = data.choices[0]?.message?.content || "Não consegui processar sua resposta no momento.";

        return NextResponse.json({ content });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
