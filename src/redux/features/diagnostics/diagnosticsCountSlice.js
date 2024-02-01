import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const diagnosticsCountSlice = createSlice({
  name: "diagnosticsCount",
  initialState,
  reducers: {
    checkDiagnosticsCount: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { checkDiagnosticsCount } = diagnosticsCountSlice.actions;
export const selectDiagnosticsCount = (state) => state.diagnosticsCount.value;

export default diagnosticsCountSlice.reducer;