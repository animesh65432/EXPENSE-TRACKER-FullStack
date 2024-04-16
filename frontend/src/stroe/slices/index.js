import { createSlice } from "@reduxjs/toolkit";

const UserLogin = createSlice({
  name: "login",
  initialState: {
    value: "" || localStorage.getItem("idtoken"),
  },
  reducers: {
    addthetokens: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("idtoken", action.payload);
    },
    deletethetokens: (state, action) => {
      state.value = "";
      localStorage.removeItem("idtoken");
    },
  },
});

export const { addthetokens, deletethetokens } = UserLogin.actions;
export default UserLogin.reducer;
