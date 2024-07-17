import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { THUNK_signinUser } from "./authSlice";

interface IUserState {
  id: string | null;
  name: string | null;
  email: string | null;
  iconPath: string | null;
  dob: string | null;
  loading: boolean;
  error: string | null;
}

export const USER_INITIAL_STATE: IUserState = {
  id: null,
  name: null,
  email: null,
  dob: null,
  iconPath: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.dob = action.payload.dob;
      state.iconPath = action.payload.iconPath;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(THUNK_signinUser.fulfilled, (state, action) => {
      const { user, token } = action.payload;

      state.id = user.id;
      state.name = user.username;
      state.email = user.email;
      state.dob = user.dob;
      state.loading = false;

      localStorage.setItem("token", token);
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
export type { IUserState };
