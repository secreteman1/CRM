import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import adminReducer from "./adminSlice";

export const store = configureStore({
  reducer: {
    Authorized: authReducer,
    Admin: adminReducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
