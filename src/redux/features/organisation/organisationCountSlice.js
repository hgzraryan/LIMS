import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const organisationCountSlice = createSlice({
  name: "organisationCount",
  initialState,
  
  reducers: {
    checkOrganisationCount: (state, action) => {
      
      state.value = action.payload;
    },
  },
});
export const { checkOrganisationCount } = organisationCountSlice.actions;
export const selectOrganisationCount = (state) => state.organisationCount.value;

export default organisationCountSlice.reducer;
