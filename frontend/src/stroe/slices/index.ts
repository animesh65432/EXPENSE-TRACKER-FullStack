import { createSlice } from "@reduxjs/toolkit";

type userloginintialstate = {
  value: string,
  ispremuinm: boolean
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
    makePremuinm: (state, action) => {
      state.ispremuinm = action.payload;
    },
  },
});

export const { addthetokens, deletethetokens, makePremuinm } =
  UserLogin.actions;
export default UserLogin.reducer;
