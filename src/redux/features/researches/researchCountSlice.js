import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const researchCountSlice = createSlice({
  name: "researchCount",
  initialState,
  reducers: {
    checkResearchCount: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { checkResearchCount } = researchCountSlice.actions;
export const selectResearchCount = (state) => state.researchCount.value;

export default researchCountSlice.reducer;
