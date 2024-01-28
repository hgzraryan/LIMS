import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const equipmentCountSlice = createSlice({
  name: "equipmentCount",
  initialState,
  reducers: {
    checkEquipmentCount: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { checkEquipmentCount } = equipmentCountSlice.actions;
export const selectEquipmentCount = (state) => state.equipmentCount.value;

export default equipmentCountSlice.reducer;
