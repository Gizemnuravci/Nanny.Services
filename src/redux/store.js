import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { nanniesReducer } from "./nannies/nanniesSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  nannies: nanniesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
