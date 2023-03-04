import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile";

export const store = configureStore({
  reducer: {
    profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
