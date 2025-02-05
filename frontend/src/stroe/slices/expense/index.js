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
