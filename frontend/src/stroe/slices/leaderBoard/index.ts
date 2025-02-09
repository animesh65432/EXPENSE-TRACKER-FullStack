import { createSlice } from "@reduxjs/toolkit";

type LeaderboardTypes = {
  _id: string,
  name: string,
  totalexpenses: number
}


type leaderboardinitalstate = {
  value: boolean,
  LeaderBorad: LeaderboardTypes[]
}

const leaderboard = createSlice({
  name: "Leaderboard",
  initialState: {
    value: false,
    LeaderBorad: []
  } as leaderboardinitalstate,
  reducers: {
    onClickleaderboard: (state) => {
      state.value = !state.value;
    },
    addtheleaderboards: (state, action) => {
      state.LeaderBorad = action.payload
    }
  },
});

export const { onClickleaderboard, addtheleaderboards } = leaderboard.actions;

export default leaderboard.reducer;
