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
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
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

export const { setName } = userSlice.actions;
export default userSlice.reducer;
export type { IUserState };
