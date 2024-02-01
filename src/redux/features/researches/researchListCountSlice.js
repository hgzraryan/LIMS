import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit"; 

const initialState = {
  value: 0,
};

export const researchListCountSlice = createSlice({
  name: "researchListCount",
  initialState,
  reducers: {
    checkResearchListCount: (state, action) => {
            //console.log(current(state));

      state.value = action.payload;
    },
  },
});
export const { checkResearchListCount } = researchListCountSlice.actions;
export const selectResearchListCount = (state) => state.researchListCount.value;

export default researchListCountSlice.reducer;
