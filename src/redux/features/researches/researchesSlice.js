import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  options: [],
};
export const researchesSlice = createSlice({
  name: "researches",
  initialState,
  reducers: {
    reserchesList: (state, action) => {
      state.options = action.payload},
    createDiscount: (state, action) => {
      state.options = state.options.map((el) => {
        return {
          ...el,
          price: Math.ceil(el.price - el.price /100 * action.payload),
        };
      });
    },
    clearDiscounts:(state)=>initialState

  },
});
export const { createDiscount, reserchesList, clearDiscounts} = researchesSlice.actions;
export const selectResearches = (state) => state.researches.options

export default researchesSlice.reducer;
