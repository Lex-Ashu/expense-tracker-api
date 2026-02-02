import { Request, Response } from 'express';
import { ExpenseService } from '../services/expense.service';

export class ExpenseController {
  private expenseService: ExpenseService;

  constructor() {
    this.expenseService = new ExpenseService();
  }

  createExpense = async (req: Request, res: Response) => {
    try {
      const expense = await this.expenseService.createExpense(req.body);
      res.status(201).json(expense);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAllExpenses = async (req: Request, res: Response) => {
    try {
      const result = await this.expenseService.getAllExpenses(req.query as any);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getExpenseById = async (req: Request, res: Response) => {
    try {
      const expense = await this.expenseService.getExpenseById(req.params.id as string);
      res.status(200).json(expense);
    } catch (error: any) {
      if (error.message === 'Expense not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  };

  updateExpense = async (req: Request, res: Response) => {
    try {
      const expense = await this.expenseService.updateExpense(req.params.id as string, req.body);
      res.status(200).json(expense);
    } catch (error: any) {
      if (error.message === 'Expense not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  };

  deleteExpense = async (req: Request, res: Response) => {
    try {
      await this.expenseService.deleteExpense(req.params.id as string);
      res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error: any) {
      if (error.message === 'Expense not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  };
}