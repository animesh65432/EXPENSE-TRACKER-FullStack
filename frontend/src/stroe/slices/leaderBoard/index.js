import { createSlice } from "@reduxjs/toolkit";

const leaderboard = createSlice({
  name: "Leaderboard",
  initialState: {
    value: false,
  },
  reducers: {
    onClickleaderboard: (state, action) => {
      state.value = !state.value;
    },
  },
});

export const { onClickleaderboard } = leaderboard.actions;

export default leaderboard.reducer;
