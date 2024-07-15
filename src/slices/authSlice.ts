import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../services";

interface IAuthState {
  loading: boolean;
  error: string | null;
}

export const AUTH_INITIAL_STATE: IAuthState = {
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

export const THUNK_signupUser = createAsyncThunk<
  SignupResponse,
  { email: string; password: string },
  { rejectValue: SignupError }
>("auth/signup", async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post(`${API_URL}auth/signup`, userData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: (error as unknown as { response: { data: { message: string } } })
        .response.data.message,
    });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: AUTH_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(THUNK_signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(THUNK_signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(THUNK_signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred";
      });
  },
});

export default authSlice.reducer;
export type { IAuthState };
