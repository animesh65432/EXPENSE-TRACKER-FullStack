import { createSlice } from "@reduxjs/toolkit";

const UserLogin = createSlice({
  name: "login",
  initialState: {
    value: false,
  },
  reducers: {
    changetotrue: (state, action) => {
      state.value = true;
    },
  },
});

export const { changetotrue } = UserLogin.actions;
export default UserLogin.reducer;
