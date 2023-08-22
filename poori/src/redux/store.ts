import { configureStore } from "@reduxjs/toolkit";
import dataCenter from "./slice/dataCenter";

export const store = configureStore({
  reducer: {
    "dataCenter": dataCenter,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
