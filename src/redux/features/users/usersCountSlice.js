import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit"; 

const initialState = {
  value: 0,
};

export const usersCountSlice = createSlice({
  name: "usersCount",
  initialState,
  reducers: {
    checkUsersCount: (state, action) => {
            //console.log(current(state));

      state.value = action.payload;
    },
  },
});
export const { checkUsersCount } = usersCountSlice.actions;
export const selectUsersCount = (state) => state.usersCount.value;

export default usersCountSlice.reducer;
