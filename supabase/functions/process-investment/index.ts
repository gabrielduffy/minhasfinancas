import "jsr:@supabase/functions-js/edge-runtime.d.ts";

/**
 * MinhasFinanças Edge Function
 * Purpose: Process investment data from text/OCR using Groq API
 */

Deno.serve(async (req) => {
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");

    if (!GROQ_API_KEY) {
        return new Response(JSON.stringify({ error: "Missing Groq API Key" }), { status: 500 });
    }

    try {
        const { text, promptMestre } = await req.json();

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",
                messages: [
                    { role: "system", content: promptMestre || "Você é um consultor financeiro de elite. Extraia ativos e valores do texto." },
                    { role: "user", content: `Analise este texto extraído de um print de investimento e extraia o ativo e o valor: ${text}` }
                ],
                temperature: 0.2,
            }),
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
});
