import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Formato Webhook UAZAPI
        const messageText = body.text || body.message?.text || body.content;
        const remoteJid = body.remoteJid || body.from || body.chatId;
        const senderName = body.pushName || body.sender?.name || "Usuário";

        if (!messageText || !remoteJid) {
            return NextResponse.json({ error: "Dados da mensagem incompletos" }, { status: 400 });
        }

        // 1. Buscar contexto do portfólio no Supabase
        const { data: investments } = await supabase
            .from('investments')
            .select('*');

        const portfolioSummary = investments?.map(inv =>
            `- ${inv.name}: R$ ${(inv.quantity * (inv.current_price || inv.average_price)).toLocaleString('pt-BR')}`
        ).join('\n') || "Sem investimentos cadastrados.";

        // 2. Inteligência Groq
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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
                        content: `Você é o Agente MinhasFinanças. Responda ${senderName} via WhatsApp.
                        Contexto da Carteira:
                        ${portfolioSummary}
                        
                        Seja premium, curto e objetivo.`
                    },
                    { role: 'user', content: messageText }
                ],
                temperature: 0.5,
            })
        });

        const groqData = await groqResponse.json();
        const aiReply = groqData.choices[0]?.message?.content || "Agente Financeiro indisponível.";

        // 3. Disparo de VOLTA para o WhatsApp (UAZAPI Sender)
        // Usamos variáveis de ambiente que você pode configurar na Vercel
        const UAZAPI_URL = process.env.UAZAPI_URL; // Ex: https://api.uazapi.com
        const UAZAPI_TOKEN = process.env.UAZAPI_TOKEN;
        const UAZAPI_INSTANCE = process.env.UAZAPI_INSTANCE;

        if (UAZAPI_URL && UAZAPI_TOKEN && UAZAPI_INSTANCE) {
            await fetch(`${UAZAPI_URL}/message/sendText`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${UAZAPI_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    instance: UAZAPI_INSTANCE,
                    number: remoteJid,
                    text: aiReply
                })
            });
        }

        return NextResponse.json({ status: "success", reply: aiReply });

    } catch (error) {
        console.error("Critical UAZAPI Error:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
