import { ExpenseModel } from '../models/expense.model';
import { IExpense } from '../interfaces/expense.interface';

export class ExpenseRepository {
  
  async create(expenseData: IExpense) {
    return await ExpenseModel.create(expenseData);
  }

  async findAll(options: {
    page?: number;
    limit?: number;
    category?: string;
    startDate?: Date;
    endDate?: Date;
    sortBy?: string;
    order?: 'asc' | 'desc';
  } = {}) {
    const { page = 1, limit = 10, category, startDate, endDate, sortBy = 'date', order = 'desc' } = options;

    const filter: any = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = startDate;
      if (endDate) filter.date.$lte = endDate;
    }

    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortBy] = order === 'asc' ? 1 : -1;

    const expenses = await ExpenseModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await ExpenseModel.countDocuments(filter);

    return {
      expenses,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalExpenses: total,
        expensesPerPage: limit
      }
    };
  }

  async findById(id: string) {
    return await ExpenseModel.findById(id);
  }

  async update(id: string, expenseData: Partial<IExpense>) {
    return await ExpenseModel.findByIdAndUpdate(id, expenseData, { new: true });
  }

  async delete(id: string) {
    return await ExpenseModel.findByIdAndDelete(id);
  }
}