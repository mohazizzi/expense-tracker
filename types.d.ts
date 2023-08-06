type ExpenseObj = {
  _id: string;
  userName: string;
  amount: number;
  description: string;
  type: string;
  year: number;
  month: number;
  day: number;
};

type IUser = {
  _id: string;
  userName: string;
  password: string;
  expenseList: Array[];
};

type User = {
  _id: string;
  userName: string;
  password: string;
  role: string;
  __v: number;
};
