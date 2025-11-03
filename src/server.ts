import express, { Request, Response} from "express";
import cors from 'cors';
import {ExpenseController} from "./controllers/ExpenseController";
import {ExpenseReducer} from "./reducers/ExpenseReducer";

const app = express();
app.use(cors());
app.use(express.json());

const controller = new ExpenseController(app);

// Получение всех расходов
controller.getExpenses((_, res: Response) => {
    ExpenseReducer.getExpenses(res);
})

// Добавление нового расхода
controller.addExpense((req: Request, res: Response) => {
    ExpenseReducer.postOrUpdateExpense(req, res)
});

// Удаление расхода по дате
controller.deleteExpense((req: Request, res: Response) => {
    ExpenseReducer.deleteExpense(req, res)
});

const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});