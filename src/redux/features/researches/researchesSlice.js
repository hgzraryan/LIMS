import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  options: [],
  savedUniqDis:[]
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
    savedUniqDiscounts:(state,action)=>{
      state.savedUniqDis = action.payload
    }
  },
});
export const { createDiscount, reserchesList, clearDiscounts,savedUniqDiscounts} = researchesSlice.actions;
export const selectResearches = (state) => state.researches.options
export const selectUniqResearches = (state) => state.researches.savedUniqDis

export default researchesSlice.reducer;
