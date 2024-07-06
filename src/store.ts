import { configureStore } from "@reduxjs/toolkit";
import userReducer, { IUserState } from "./slices/userSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = {
  user: IUserState;
};

export type AppDispatch = typeof store.dispatch;
export const dispatch = useDispatch;

export default store;
