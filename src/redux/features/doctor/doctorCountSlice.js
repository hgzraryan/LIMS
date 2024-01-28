import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const doctorCountSlice = createSlice({
  name: "doctorCount",
  initialState,
  reducers: {
    checkDoctorCount: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { checkDoctorCount } = doctorCountSlice.actions;
export const selectDoctorCount = (state) => state.doctorCount.value;

export default doctorCountSlice.reducer;
