import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { savePortfolioData } from '@/lib/data';

// This is a simple migration route.
// It reads the local 'data/portfolio.json' and saves it to Supabase via 'savePortfolioData'.
// Security: This should ideally be protected or removed after use. For this demo, it's open.
export async function GET() {
    try {
        const dataFile = path.join(process.cwd(), 'data/portfolio.json');

        // Read the local file
        const fileContents = await fs.readFile(dataFile, 'utf8');
        const jsonData = JSON.parse(fileContents);

        if (!jsonData) {
            return NextResponse.json({ error: 'No data found in portfolio.json' }, { status: 404 });
        }

        // Save to Supabase (which upserts row with ID 1)
        const success = await savePortfolioData(jsonData);

        if (success) {
            return NextResponse.json({
                message: 'Successfully migrated data to Supabase!',
                dataSrc: 'data/portfolio.json',
                details: 'You can now delete this route file or data/portfolio.json if you wish.'
            });
        } else {
            return NextResponse.json({ error: 'Failed to save to Supabase' }, { status: 500 });
        }

    } catch (error) {
        console.error('Migration error:', error);
        return NextResponse.json({ error: 'Migration failed: ' + error.message }, { status: 500 });
    }
}
