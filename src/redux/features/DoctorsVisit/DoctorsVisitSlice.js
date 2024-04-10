import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit"; 

const initialState = {
  value: 0,
};

export const DoctorsVisitSlice = createSlice({
  name: "doctorsVisit",
  initialState,
  reducers: {
    checkDoctorsVisitCount: (state, action) => {
            //console.log(current(state));

      state.value = action.payload;
    },
  },
});
export const { checkDoctorsVisitCount } = DoctorsVisitSlice.actions;
export const selectDoctorsVisitCount = (state) => state.DoctorsVisitCount.value;

export default DoctorsVisitSlice.reducer;
