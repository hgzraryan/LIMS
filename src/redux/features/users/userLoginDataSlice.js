import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit"; 

const initialState = {
  value:{},
};

export const userLoginDataSlice = createSlice({
  name: "userLoginData",
  initialState,
  reducers: {
    checkUserLoginData: (state, action) => {
            //console.log(current(state));

      state.value = action.payload;
    },
  },
});
export const { checkUserLoginData } = userLoginDataSlice.actions;
export const selectUserLoginData = (state) => state.userLoginData.value;

export default userLoginDataSlice.reducer;