import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  value:0
};
export const discountValueSlice = createSlice({
  name: "discountValue",
  initialState,
  reducers: {
    disValue: (state, action) => {state.value = action.payload},
    deleteDisValue: (state, action) => {state.value = 0},
  },
});
export const { disValue,deleteDisValue} = discountValueSlice.actions;
export const selectdiscountValue = (state) => state.discountValue.value;

export default discountValueSlice.reducer;



