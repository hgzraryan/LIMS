import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    value: []
};
export const refDoctorsSlice = createSlice({
  name: "refDoctors",
  initialState,
  reducers: {
    checkRefDoctors: (state, action) => {
      state.value = action.payload},
    
  },
});
export const { checkRefDoctors} = refDoctorsSlice.actions;
export const selectRefDoctors = (state) => state.refDoctors.value

export default refDoctorsSlice.reducer;
