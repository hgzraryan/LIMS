import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const agentsCountSlice = createSlice({
  name: "agentsCount",
  initialState,
  reducers: {
    checkAgentsCount: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { checkAgentsCount } = agentsCountSlice.actions;
export const selectAgentsCount = (state) => state.agentsCount.value;

export default agentsCountSlice.reducer;
