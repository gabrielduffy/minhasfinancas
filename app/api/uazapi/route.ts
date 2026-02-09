import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Formato comum de Webhook (pode variar conforme a instância UAZAPI)
        // Normalmente: body.text ou body.message.text
        const messageText = body.text || body.message?.text || body.content;
        const sender = body.sender || body.from || "Usuário";

        if (!messageText) {
            return NextResponse.json({ error: "Nenhuma mensagem enviada" }, { status: 400 });
        }

        // 1. Buscar contexto do portfólio para a IA
        const { data: investments } = await supabase
            .from('investments')
            .select('*');

        const portfolioSummary = investments?.map(inv =>
            `- ${inv.name} (${inv.category}): R$ ${(inv.quantity * (inv.current_price || inv.average_price)).toLocaleString('pt-BR')}`
        ).join('\n') || "Nenhum investimento cadastrado ainda.";

        // 2. Chamar Groq com contexto personalizado
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
                        content: `Você é o Agente MinhasFinanças, um especialista em investimentos de elite. 
                        Você está conversando com ${sender} via WhatsApp.
                        
                        Aqui está o portfólio atual do usuário no banco de dados:
                        ${portfolioSummary}
                        
                        Responda de forma extremamente concisa, direta e com um tom premium. 
                        Use emojis financeiros com moderação. 
                        Se o usuário perguntar sobre o patrimônio, use os dados acima.`
                    },
                    { role: 'user', content: messageText }
                ],
                temperature: 0.6,
            })
        });

        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content || "Desculpe, tive um problema ao processar seu pedido.";

        // 3. Retornar no formato esperado pela UAZAPI ou apenas o texto
        // Algumas instâncias esperam um JSON específico para responder o chat na hora
        return NextResponse.json({
            reply: aiResponse,
            content: aiResponse,
            status: "success"
        });

    } catch (error) {
        console.error("UAZAPI Logic Error:", error);
        return NextResponse.json({ error: "Erro interno no Agente Groq" }, { status: 500 });
    }
}
