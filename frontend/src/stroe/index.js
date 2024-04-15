import { configureStore } from "@reduxjs/toolkit";
import userloginreducer from "./slices";

const store = configureStore({
  reducer: {
    user: userloginreducer,
  },
});

export default store;
