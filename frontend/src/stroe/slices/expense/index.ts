import { createSlice } from "@reduxjs/toolkit";

type Expensestypes = {
  _id: string,
  Category: string,
  Expenseamount: number,
  ExpensesName: string,
  createdAt: string
}

type ExpenseIntialstate = {
  values: Expensestypes[]
}

const Expenses = createSlice({
  name: "Expenses",
  initialState: {
    values: [],
  } as ExpenseIntialstate,
  reducers: {
    Getexpenses: (state, action) => {
      state.values = action.payload;
    },
    deleteexpenses: (state, action) => {
      const id = action.payload;
      const WithOutDeleteExpenses = state.values.filter((obj) => obj._id != id);
      state.values = WithOutDeleteExpenses;
    },
    addexpensefromExpenseFrom: (state, action) => {
      state.values = state.values.concat(action.payload);
    },
    updateexpense: (state, action) => {
      state.values = state.values.map((expense) =>
        expense._id === action.payload._id ? { ...expense, ...action.payload } : expense
      );
    },
  },
});

export const {
  Getexpenses,
  deleteexpenses,
  addexpensefromExpenseFrom,
  updateexpense,
} = Expenses.actions;
export default Expenses.reducer;
