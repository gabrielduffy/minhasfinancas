-- Create tables for MinhasFinanças

-- Table for user AI configurations (System Prompt)
CREATE TABLE IF NOT EXISTS ai_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    system_prompt TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table for investment assets
CREATE TABLE IF NOT EXISTS investments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- Renda Fixa, Variável, Bitcoin, Internacional
    symbol TEXT, -- e.g., BTC, ITUB4
    institution TEXT DEFAULT 'XP', -- e.g., XP, Binance
    quantity DECIMAL NOT NULL DEFAULT 0,
    average_price DECIMAL NOT NULL DEFAULT 0,
    current_price DECIMAL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table for transactions (history)
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    investment_id UUID REFERENCES investments(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- BUY, SELL, DIVIDEND
    amount DECIMAL NOT NULL,
    price DECIMAL NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    description TEXT
);

-- Enable RLS
ALTER TABLE ai_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Simple RLS Policies (User only sees their own data)
CREATE POLICY "Users can manage their own AI config" ON ai_config FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own investments" ON investments FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own transactions" ON transactions FOR ALL USING (auth.uid() = user_id);
