import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useReduxDispatch } from "react-redux";
import { thunkMiddleware } from "./middleware/thunkMiddleware";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import commonReducer from "./slices/commonSlice";

const customMiddleware = [thunkMiddleware];

// Configure the store with the reducers
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    common: commonReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat([
      ...customMiddleware,
    ]);
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const dispatch = store.dispatch;
export const state = store.getState();
export const useAppDispatch = () => useReduxDispatch<AppDispatch>();

export default store;
