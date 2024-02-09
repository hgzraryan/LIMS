import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    value: []
};
export const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    checkDoctors: (state, action) => {
      state.value = action.payload},
    
  },
});
export const { checkDoctors} = doctorsSlice.actions;
export const selectDoctors = (state) => state.doctors.value

export default doctorsSlice.reducer;
