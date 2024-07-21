import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { THUNK_signinUser, THUNK_signoutUser } from "./authSlice";

interface IUserState {
  id: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  createdAt: string | null;
  email: string | null;
  dob: string | null;
  iconPath: string | null;
  isActive: boolean;
  loading: boolean;
  error: string | null;
}

export const USER_INITIAL_STATE: IUserState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  dob: null,
  iconPath: null,
  createdAt: null,
  isActive: true,
  username: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      const {
        id,
        firstName,
        lastName,
        email,
        dob,
        iconPath,
        isActive,
        username,
      } = action.payload;
      state.id = id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.dob = dob;
      state.iconPath = iconPath;
      state.isActive = isActive;
      state.username = username;

      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(THUNK_signinUser.fulfilled, (state, action) => {
      const { user, token } = action.payload;

      state.id = user.id;
      state.firstName = user.firstName;
      state.lastName = user.lastName;
      state.email = user.email;
      state.dob = user.dob;
      state.iconPath = user.iconPath;
      state.isActive = user.isActive;
      state.username = user.username;

      state.loading = false;

      localStorage.setItem("token", token);
    });
    builder.addCase(THUNK_signoutUser.fulfilled, (state) => {
      Object.assign(state, USER_INITIAL_STATE);
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
export type { IUserState };
