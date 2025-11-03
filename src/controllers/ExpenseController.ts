import {Express, Request, Response} from "express";

export class ExpenseController {
    private readonly _server: Express;

    constructor(express: Express) {
        this._server = express;
    }

    public getExpenses(action: (req: Request, res: Response) => void) {
        return this._server.get('/api/expenses', action);
    }

    public addExpense(action: (req: Request, res: Response) => void) {
        return this._server.post('/api/expenses', action);
    }

    public deleteExpense(action: (req: Request, res: Response) => void) {
        return this._server.delete('/api/expenses/:date', action);
    }

    get server(): Express {
        return this._server;
    }
}