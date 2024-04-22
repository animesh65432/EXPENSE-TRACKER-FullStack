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
  },
});

export const { Getexpenses, deleteexpenses, addexpensefromExpenseFrom } =
  Expenses.actions;
export default Expenses.reducer;
