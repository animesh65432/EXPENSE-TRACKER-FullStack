import { configureStore } from "@reduxjs/toolkit";
import userloginreducer from "./slices";
import expenseReducer from "./slices/expense/index.js";
import Leaderbordreucer from "./slices/leaderBoard";

const store = configureStore({
  reducer: {
    user: userloginreducer,
    expenses: expenseReducer,
    leaderBoard: Leaderbordreucer,
  },
});

export default store;
