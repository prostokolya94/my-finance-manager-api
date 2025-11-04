import fs from "fs";
import path from "path";

const basePath = process.env.ROOT === "src" ? __dirname : '/app' // базовый путь в контейнере
const storePath = path.join(basePath, '../store');
const dataPath = path.join(storePath, 'expenses.json');

function readExpenses() {
    try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading expenses:', error);
        throw error;
    }
}

function writeExpenses(data: any[]) {
    try {
        if (!fs.existsSync(storePath)) {
            fs.mkdirSync(storePath, { recursive: true });
        }
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing expenses:', error);
        throw error;
    }
}

export {readExpenses, writeExpenses};