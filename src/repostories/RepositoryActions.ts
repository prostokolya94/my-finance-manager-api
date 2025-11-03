import fs from "fs";
import path from "path";


const dataPath = path.join(__dirname, '../store', 'expenses.json');

function readExpenses() {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
}

function writeExpenses(data: any[]) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

export {readExpenses, writeExpenses}