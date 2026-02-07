import { promises as fs } from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data/portfolio.json');

export async function getPortfolioData() {
    try {
        const fileContents = await fs.readFile(dataFile, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Error reading portfolio data:", error);
        return null;
    }
}

export async function savePortfolioData(data) {
    try {
        await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error("Error saving portfolio data:", error);
        return false;
    }
}
