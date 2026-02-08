import { NextResponse } from 'next/server';
import { savePortfolioData } from '@/lib/data';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const jsonPath = path.join(process.cwd(), 'data', 'portfolio.json');

        if (!fs.existsSync(jsonPath)) {
            return NextResponse.json({ error: 'data/portfolio.json not found. Nothing to migrate.' }, { status: 404 });
        }

        const fileContents = fs.readFileSync(jsonPath, 'utf8');
        const jsonData = JSON.parse(fileContents);

        const success = await savePortfolioData(jsonData);

        if (success) {
            return NextResponse.json({ message: 'Successfully migrated data from portfolio.json to Supabase!' });
        } else {
            return NextResponse.json({ error: 'Failed to save data to Supabase during migration.' }, { status: 500 });
        }
    } catch (error) {
        console.error("Migration error:", error);
        return NextResponse.json({ error: 'Migration failed: ' + error.message }, { status: 500 });
    }
}
