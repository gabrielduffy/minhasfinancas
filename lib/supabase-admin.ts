import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Cliente com privilégios administrativos (bypassa RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

/**
 * Função para executar SQL diretamente no Supabase.
 * Útil para quando o MCP falha.
 */
export async function executeAdminSql(sql: string) {
    const { data, error } = await supabaseAdmin.rpc('exec_sql', { sql_query: sql });
    if (error) {
        // Se a RPC não existir, tentamos via REST ou avisamos
        console.error("Erro ao executar SQL Admin:", error);
        throw error;
    }
    return data;
}
