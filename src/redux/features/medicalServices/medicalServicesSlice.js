import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit"; 

const initialState = {
  value: 0,
};

export const medicalServicesSlice = createSlice({
  name: "medicalServices",
  initialState,
  reducers: {
    checkMedicalServicesCount: (state, action) => {
            //console.log(current(state));

      state.value = action.payload;
    },
  },
});
export const { checkMedicalServicesCount } = medicalServicesSlice.actions;
export const selectMedicalServicesCount = (state) => state.medicalServicesCount.value;

export default medicalServicesSlice.reducer;
