import { configureStore } from "@reduxjs/toolkit";
import userloginreducer from "./slices";
import expenseReducer from "./slices/expense/index.js";

const store = configureStore({
  reducer: {
    user: userloginreducer,
    expenses: expenseReducer,
  },
});

export default store;
