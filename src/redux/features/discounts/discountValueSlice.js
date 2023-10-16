import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  value:0,
  uniqValue:0
};
export const discountValueSlice = createSlice({
  name: "discountValue",
  initialState,
  reducers: {
    disValue: (state, action) => {state.value = action.payload},
    deleteDisValue: (state, action) => {state.value = 0},
    disUniqValue: (state, action) => {state.uniqValue = action.payload},
    deleteDisUniqValue: (state, action) => {state.uniqValue = 0},
  },
});
export const { disValue,disUniqValue,deleteDisValue,deleteDisUniqValue} = discountValueSlice.actions;
export const selectdiscountValue = (state) => state.discountValue.value;
export const selectdiscounUniqValue = (state) => state.discountValue.uniqValue;

export default discountValueSlice.reducer;



