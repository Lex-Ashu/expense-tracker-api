import { ExpenseRepository } from '../repositories/expense.repository';
import { IExpense } from '../interfaces/expense.interface';

export class ExpenseService {
  private expenseRepository: ExpenseRepository;

  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  async createExpense(expenseData: IExpense) {
    if (expenseData.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    return await this.expenseRepository.create(expenseData);
  }

  async getAllExpenses(query: {
    page?: string;
    limit?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }) {
    const options = {
      page: query.page ? parseInt(query.page) : 1,
      limit: query.limit ? parseInt(query.limit) : 10,
      category: query.category,
      startDate: query.startDate ? new Date(query.startDate) : undefined,
      endDate: query.endDate ? new Date(query.endDate) : undefined,
      sortBy: query.sortBy || 'date',
      order: query.order || 'desc' as 'asc' | 'desc'
    };

    return await this.expenseRepository.findAll(options);
  }

  async getExpenseById(id: string) {
    const expense = await this.expenseRepository.findById(id);
    if (!expense) {
      throw new Error('Expense not found');
    }
    return expense;
  }

  async updateExpense(id: string, expenseData: Partial<IExpense>) {
    if (expenseData.amount && expenseData.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    
    const expense = await this.expenseRepository.update(id, expenseData);
    if (!expense) {
      throw new Error('Expense not found');
    }
    return expense;
  }

  async deleteExpense(id: string) {
    const expense = await this.expenseRepository.delete(id);
    if (!expense) {
      throw new Error('Expense not found');
    }
    return expense;
  }
}