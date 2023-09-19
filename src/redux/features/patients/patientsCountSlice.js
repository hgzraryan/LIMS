import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const patientsCountSlice = createSlice({
  name: "patientsCount",
  initialState,
  reducers: {
    checkPatientsCount: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { checkPatientsCount } = patientsCountSlice.actions;
export const selectPatientsCount = (state) => state.patientsCount.value;

export default patientsCountSlice.reducer;
