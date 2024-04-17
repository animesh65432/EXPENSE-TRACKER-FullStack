import { createSlice } from "@reduxjs/toolkit";

const UserLogin = createSlice({
  name: "login",
  initialState: {
    value: "" || localStorage.getItem("idtoken"),
    ispremuinm: false,
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
    makePremuinm: (state, action) => {
      console.log(action.payload);
      state.ispremuinm = action.payload;
    },
  },
});

export const { addthetokens, deletethetokens, makePremuinm } =
  UserLogin.actions;
export default UserLogin.reducer;
