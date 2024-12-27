import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = { accessToken: "", refreshToken: "" };

const authSlice = createSlice({
  name: "autorisationTokens",
  initialState,
  reducers: {
    saveTokens(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    deleteTokens(state) {
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const { saveTokens, deleteTokens } = authSlice.actions;
export default authSlice.reducer;
