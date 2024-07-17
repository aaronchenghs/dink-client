import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useReduxDispatch } from "react-redux";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";

// Configure the store with the reducers
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const dispatch = store.dispatch;
export const state = store.getState();
export const useAppDispatch = () => useReduxDispatch<AppDispatch>();

export default store;
