import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const reagentsCountSlice = createSlice({
  name: "reagentsCount",
  initialState,
  reducers: {
    checkReagentsCount: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { checkReagentsCount } = reagentsCountSlice.actions;
export const selectReagentsCount = (state) => state.reagentsCount.value;

export default reagentsCountSlice.reducer;
