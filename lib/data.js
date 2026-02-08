import { supabase } from './supabase';

export async function getPortfolioData() {
    try {
        const { data, error } = await supabase
            .from('portfolio')
            .select('*')
            .eq('id', 1)
            .single();

        if (error) {
            // If table is empty or error, fall back or return null
            console.warn("Supabase fetch error (might be empty):", error.message);
            return null;
        }

        // Supabase returns the row. Our JSON structure was the whole object.
        // We will assume the columns match the top-level keys OR we put everything in a 'content' column.
        // Let's assume we put everything in a 'content' JSONB column for maximum flexibility and compatibility.
        if (data && data.content) {
            return data.content;
        }
        return null;
    } catch (error) {
        console.error("Error reading portfolio data:", error);
        return null;
    }
}

export async function savePortfolioData(data) {
    try {
        // Upsert row id=1
        const { error } = await supabase
            .from('portfolio')
            .upsert({ id: 1, content: data });

        if (error) {
            console.error("Supabase load error:", error);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error saving portfolio data:", error);
        return false;
    }
}
