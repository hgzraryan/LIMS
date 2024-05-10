import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const refDoctorsCountSlice = createSlice({
  name: "refDoctorsCount",
  initialState,
  reducers: {
    checkRefDoctorsCount: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { checkRefDoctorsCount } = refDoctorsCountSlice.actions;
export const selectRefDoctorsCount = (state) => state.refDoctorsCount.value;

export default refDoctorsCountSlice.reducer;
