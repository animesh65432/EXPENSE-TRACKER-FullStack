import { createSlice } from "@reduxjs/toolkit";

type userloginintialstate = {
  value: string
}

const UserLogin = createSlice({
  name: "login",
  initialState: {
    value: localStorage.getItem("idtoken") || "",
    ispremuinm: false,
  } as userloginintialstate,
  reducers: {
    addthetokens: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("idtoken", action.payload);
    },
    deletethetokens: (state) => {
      state.value = "";
      localStorage.removeItem("idtoken");
    },

  },
});

export const { addthetokens, deletethetokens } =
  UserLogin.actions;
export default UserLogin.reducer;
