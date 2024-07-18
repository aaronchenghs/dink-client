import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { buildAxiosCall } from "../services";
import axiosInstance from "../middleware/axiosConfig";

interface IAuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const AUTH_INITIAL_STATE: IAuthState = {
  token: localStorage.getItem("token"),
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
    const { data } = await buildAxiosCall<
      SignupResponse,
      { email: string; password: string }
    >("POST", "auth/signup", userData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: (error as { response: { data: { message: string } } }).response
        .data.message,
    });
  }
});

interface SigninResponse {
  token: string;
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    username: string;
    email: string;
    iconPath: string | null;
    dob: string;
    createdAt: string;
    isActive: boolean;
  };
}

export const THUNK_signinUser = createAsyncThunk<
  SigninResponse,
  { email: string; password: string },
  { rejectValue: SignupError }
>("auth/signin", async (userData, thunkAPI) => {
  try {
    const { data } = await buildAxiosCall<
      SigninResponse,
      { email: string; password: string }
    >("POST", "auth/signin", userData);
    localStorage.setItem("token", data.token); // Store token in local storage
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: (error as { response: { data: { message: string } } }).response
        .data.message,
    });
  }
});

export const THUNK_refreshToken = createAsyncThunk<
  { token: string },
  void,
  { rejectValue: SignupError }
>("auth/refreshToken", async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post<{ token: string }>(
      "auth/refresh-token"
    );
    localStorage.setItem("token", data.token); // Store new token in local storage
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: (error as { response: { data: { message: string } } }).response
        .data.message,
    });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
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
      })
      .addCase(THUNK_signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(THUNK_signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(THUNK_signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred";
      })
      .addCase(THUNK_refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(THUNK_refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(THUNK_refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred";
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
export type { IAuthState };
