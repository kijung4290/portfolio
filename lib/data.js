import { supabase } from './supabase';
import { mockPortfolioData } from './mockData';

export async function getPortfolioData() {
    try {
        const { data, error } = await supabase
            .from('portfolio')
            .select('*')
            .eq('id', 1)
            .single();

        if (error) {
            console.warn("Supabase fetch error (might be empty):", error.message);
            console.warn("Falling back to local mock data.");
            return mockPortfolioData;
        }

        // Supabase returns the row. Our JSON structure was the whole object.
        if (data && data.content) {
            return data.content;
        }

        console.warn("Data found but empty content. Using mock data.");
        return mockPortfolioData;
    } catch (error) {
        console.error("Error reading portfolio data:", error);
        return mockPortfolioData;
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
