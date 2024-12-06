import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import fitnessReducer from "./features/fitnessclass/fitnessSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fitness: fitnessReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
