export type Expense = {
    date?: [number, number, number]; // [year, month, day]
    groceries: number;
    home: number;
    transport: number;
    clothes: number;
    restaurant: number;
    other: number;
}