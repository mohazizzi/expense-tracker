import { Schema, model, models } from "mongoose";

const ExpenseSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  year: {
    type: Number,
    require: true,
  },
  month: {
    type: Number,
    require: true,
  },
  day: {
    type: Number,
    require: true,
  },
});

const Expense = models.Expense || model("Expense", ExpenseSchema);

export default Expense;
