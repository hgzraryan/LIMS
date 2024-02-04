import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    value: []
};
export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    checkPatients: (state, action) => {
      state.value = action.payload},
    
  },
});
export const { checkPatients} = patientsSlice.actions;
export const selectPatients = (state) => state.patients.value

export default patientsSlice.reducer;
