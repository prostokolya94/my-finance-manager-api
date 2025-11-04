import fs from "fs";
import path from "path";

const basePath = process.env.ROOT === "src" ? path.join(__dirname, "../store") : '/app/dist/store' // базовый путь в контейнере
console.log(basePath);
const dataPath = path.join(basePath, 'expenses.json');

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
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing expenses:', error);
        throw error;
    }
}

export {readExpenses, writeExpenses};