import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = { isAdmin: false };

const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    setIsAdmin(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
  },
});

export const { setIsAdmin } = adminSlice.actions;
export default adminSlice.reducer;
