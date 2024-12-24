import { combineReducers } from "redux";
import authReducer from "./authReducer.ts";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
