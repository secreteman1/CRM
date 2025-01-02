import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = { isAuthorized: false };

const authSlice = createSlice({
  name: "Authorized",
  initialState,
  reducers: {
    setIsAuthorized(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload;
    },
  },
});

export const { setIsAuthorized } = authSlice.actions;
export default authSlice.reducer;
