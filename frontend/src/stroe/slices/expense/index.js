import { createSlice } from "@reduxjs/toolkit";

const Expenses = createSlice({
  name: "Expenses",
  initialState: {
    values: [],
  },
  reducers: {
    Getexpenses: (state, action) => {
      state.values = action.payload;
    },
    deleteexpenses: (state, action) => {
      const id = action.payload;
      const WithOutDeleteExpenses = state.values.filter((obj) => obj.id !== id);
      state.values = WithOutDeleteExpenses;
    },
    addexpensefromExpenseFrom: (state, action) => {
      state.values = state.values.concat(action.payload);
    },
    updateexpense: (state, action) => {
      const { id, ExpensesName, description, Category, Expenseamount } =
        action.payload;

      state.values = state.values.map((expense) =>
        expense.id === id
          ? { ...expense, ExpensesName, description, Category, Expenseamount }
          : expense
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
