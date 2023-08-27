import { configureStore } from "@reduxjs/toolkit";
import dataCenter from "./slice/dataCenter";
import UI_UX from "./slice/UI_UX";

export const store = configureStore({
  reducer: {
    "dataCenter": dataCenter,
    "UI_UX": UI_UX
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
