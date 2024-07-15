import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  id: string | null;
  name: string | null;
  email: string | null;
  iconPath: string | null;
  loading: boolean;
  error: string | null;
}

export const USER_INITIAL_STATE: IUserState = {
  id: null,
  name: null,
  email: null,
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
    builder;
  },
});

export const { setName } = userSlice.actions;
export default userSlice.reducer;
export type { IUserState };
