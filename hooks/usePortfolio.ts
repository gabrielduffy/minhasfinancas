import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Investment {
    id: string;
    name: string;
    category: string;
    symbol: string | null;
    quantity: number;
    average_price: number;
    current_price: number | null;
}

export function usePortfolio() {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchInvestments() {
        try {
            setLoading(true);
            const { data, error: supabaseError } = await supabase
                .from('investments')
                .select('*');

            if (supabaseError) throw supabaseError;
            setInvestments(data || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchInvestments();
    }, []);

    const totalPatrimony = investments.reduce((acc, inv) => {
        const price = inv.current_price || inv.average_price;
        return acc + (inv.quantity * price);
    }, 0);

    const allocationData = Object.entries(
        investments.reduce((acc: Record<string, number>, inv) => {
            const price = inv.current_price || inv.average_price;
            const value = inv.quantity * price;
            acc[inv.category] = (acc[inv.category] || 0) + value;
            return acc;
        }, {})
    ).map(([name, value]) => ({
        name,
        value: Number(((value / (totalPatrimony || 1)) * 100).toFixed(0)),
        color: getColorForCategory(name)
    }));

    return { investments, totalPatrimony, allocationData, loading, error, refresh: fetchInvestments };
}

function getColorForCategory(category: string) {
    const colors: Record<string, string> = {
        'Renda Fixa': '#CCFF00',
        'Cripto': '#F7931A',
        'Bitcoin': '#F7931A',
        'Ações': '#888888',
        'Variável': '#888888',
        'Internacional': '#0070f3'
    };
    return colors[category] || '#666';
}
