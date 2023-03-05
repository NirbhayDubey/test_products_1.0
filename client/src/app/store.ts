import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profileSlice";
import productReducer from "../features/productSlice";

export const store = configureStore({
  reducer: {
    profileReducer,
    productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
