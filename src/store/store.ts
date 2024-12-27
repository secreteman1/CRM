import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    autorisationTokens: authReducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
