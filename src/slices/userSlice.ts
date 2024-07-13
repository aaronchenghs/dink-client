import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../services";

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

interface SignupResponse {
  id: string;
  username: string;
  email: string;
  iconPath: string;
}

interface SignupError {
  message: string;
}

export const signupUser = createAsyncThunk<
  SignupResponse,
  { email: string; password: string },
  { rejectValue: SignupError }
>("user/signupUser", async (userData, thunkAPI) => {
  try {
    console.log("Hello!");
    const { data } = await axios.post(`${API_URL}auth/signup`, userData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: (error as any).response.data.message,
    });
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.name = action.payload.username;
        state.email = action.payload.email;
        state.iconPath = action.payload.iconPath;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred";
      });
  },
});

export const { setName } = userSlice.actions;
export default userSlice.reducer;
export type { IUserState };
