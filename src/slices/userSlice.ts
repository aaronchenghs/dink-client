import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  id: string | null;
  name: string | null;
  email: string | null;
  iconPath: string | null;
}

export const USER_INITIAL_STATE: IUserState = {
  id: null,
  name: null,
  email: null,
  iconPath: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = userSlice.actions;
export default userSlice.reducer;
export type { IUserState };
