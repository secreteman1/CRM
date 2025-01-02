import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    Authorized: authReducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
