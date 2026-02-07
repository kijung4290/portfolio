import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/data';

export async function GET() {
    const data = await getPortfolioData();
    return NextResponse.json(data);
}

export async function POST(request) {
    try {
        const body = await request.json();
        const success = await savePortfolioData(body);
        if (success) {
            return NextResponse.json({ message: 'Saved successfully' });
        } else {
            return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
