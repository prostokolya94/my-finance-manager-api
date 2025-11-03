import {isEqual} from "../utils/isEqual";
import * as repositoryAction from "../repostories/RepositoryActions";
import {Expense} from "../types/Types";

export class ExpenseReducer {

    public static getExpenses(res: any) {
        const content = repositoryAction.readExpenses()
        return res.json(content);
    }

    public static postOrUpdateExpense(req: any, res: any) {
        const currentExpense = req.body;
        const content = repositoryAction.readExpenses() as Expense[]
        const index = content.findIndex((expense) => isEqual(expense.date, currentExpense.date));
        if (index !== -1) {
            content.splice(index, 1, currentExpense)
            repositoryAction.writeExpenses(content)
        } else {
            repositoryAction.writeExpenses([...content, currentExpense])
        }
        return res.json(content);
    }

    public static deleteExpense(req: any, res: any) {
        const expenses = repositoryAction.readExpenses() as Expense[];
        const dateStr = req.params.date;
        const dateArray = dateStr.split(',').map(Number);
        const index = expenses.findIndex(item =>
            Array.isArray(item.date) &&
            item.date.join(',') === dateArray.join(',')
        );
        if (index === -1) {
            return res.status(404).json({ message: 'Расход не найден' });
        }
        expenses.splice(index, 1);
        repositoryAction.writeExpenses(expenses)
        return res.json({ message: 'Расход удалён успешно' });
    }
}