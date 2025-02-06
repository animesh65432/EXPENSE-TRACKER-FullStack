import { createSlice } from "@reduxjs/toolkit";


type leaderboardinitalstate = {
  value: boolean
}

const leaderboard = createSlice({
  name: "Leaderboard",
  initialState: {
    value: false,
  } as leaderboardinitalstate,
  reducers: {
    onClickleaderboard: (state) => {
      state.value = !state.value;
    },
  },
});

export const { onClickleaderboard } = leaderboard.actions;

export default leaderboard.reducer;
