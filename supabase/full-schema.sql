-- TABELA DE CONFIGURAÇÕES DA IA
CREATE TABLE IF NOT EXISTS public.ai_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    system_prompt TEXT NOT NULL,
    groq_api_key TEXT, -- Opcional: Chave do usuário ou global
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- TABELA DE INVESTIMENTOS
CREATE TABLE IF NOT EXISTS public.investments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    asset_name TEXT NOT NULL,
    asset_type TEXT NOT NULL, -- Renda Fixa, Ações, Cripto, etc.
    symbol TEXT, -- Ticker na bolsa
    quantity DECIMAL NOT NULL DEFAULT 0,
    average_price DECIMAL NOT NULL DEFAULT 0,
    current_price DECIMAL,
    institution TEXT, -- Onde está o dinheiro (XP, BTG, etc.)
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- TABELA DE SAÚDE FINANCEIRA (FALTA NA ESTRUTURA ATUAL)
CREATE TABLE IF NOT EXISTS public.financial_health (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    cpf_status TEXT,
    credit_score INT,
    legal_processes JSONB, -- Lista de processos
    bank_rating TEXT,
    last_updated TIMESTAMPTZ DEFAULT now()
);

-- POLÍTICAS DE RLS (SEGURANÇA EXTREMA)
ALTER TABLE public.ai_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_health ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver suas próprias configurações" ON public.ai_config FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem editar suas próprias configurações" ON public.ai_config FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem ver seus investimentos" ON public.investments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem gerenciar seus investimentos" ON public.investments FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem ver sua saúde" ON public.financial_health FOR SELECT USING (auth.uid() = user_id);
