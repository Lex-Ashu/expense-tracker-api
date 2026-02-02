import mongoose, { Schema } from 'mongoose';

const expenseSchema = new Schema(
  {
    amount: { type: Number, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other']
    },
    description: { type: String, required: true },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

export const ExpenseModel = mongoose.model('Expense', expenseSchema);