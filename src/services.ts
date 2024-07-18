/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./middleware/axiosConfig";
import { AppDispatch } from "./store";
import { setToken, THUNK_refreshToken } from "./slices/authSlice";
import { setUser } from "./slices/userSlice";

export const API_URL = "https://localhost:7015/api/";

export const initializeAuth = async (dispatch: AppDispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      await axiosInstance.get("/auth/validate-token");
      dispatch(setToken(token));

      // Fetch user data
      const { data } = await axiosInstance.get("/auth/user");
      dispatch(setUser(data));
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(THUNK_refreshToken());
      } else {
        localStorage.removeItem("token");
      }
    }
  }
};

export async function refreshToken() {
  try {
    const response = await axios.post<{ token: string }>(
      `${API_URL}auth/refresh-token`,
      {},
      { withCredentials: true }
    );
    localStorage.setItem("token", response.data.token);
    return response.data.token;
  } catch (error) {
    console.error("Failed to refresh token", error);
    return null;
  }
}
/**
 * Builds an Axios config object containing the Authorization header for the current authenticated user
 */
export async function buildAxiosConfig(
  signal?: AbortSignal,
  params?: any,
  configs?: AxiosRequestConfig
): Promise<AxiosRequestConfig> {
  // get authentication token
  const jwtToken = localStorage.getItem("token");

  if (signal) {
    return {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      signal: signal,
      params,
      ...configs,
    };
  }
  if (params && params.headers) {
    return {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        ...params.headers,
      },
      ...configs,
    };
  }
  return {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    params,
    ...configs,
  };
}

/**
 * Builds an Axios GET, POST, or PUT of the specified type T and return type R
 * @param method GET, POST, or PUT
 * @param endpoint Api endpoint to call
 * @param params Optional params for config
 * @param data Data to pass to endpoint for POST or PUT calls
 */
export async function buildAxiosCall<R, T>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  endpoint: string,
  data?: T,
  params?: any,
  signal?: AbortSignal,
  configs?: AxiosRequestConfig
): Promise<AxiosResponse<R>> {
  const url = `${API_URL}${endpoint}`;

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    signal,
    params,
    ...configs,
  };

  try {
    switch (method) {
      case "GET":
      default:
        return axiosInstance.get<R>(url, config);
      case "POST":
        return axiosInstance.post<T, AxiosResponse<R>>(url, data, config);
      case "PUT":
        return axiosInstance.put<T, AxiosResponse<R>>(url, data, config);
      case "DELETE":
        return axiosInstance.delete<R>(url, config);
      case "PATCH":
        return axiosInstance.patch<T, AxiosResponse<R>>(url, data, config);
    }
  } catch (error) {
    if ((error as any).response && (error as any).response.status === 401) {
      const newToken = await refreshToken();
      if (newToken && config.headers) {
        localStorage.setItem("token", newToken);
        config.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance({
          method,
          url,
          data,
          ...config,
        });
      }
    }
    throw error;
  }
}

/**
 * This is meant to go in thunk IDs. You can find examples throughout the app.
 * For quick reference, is an example of a proper ID:
 *
 * 
* `${ThunkOperation.GET}-Documents-By Id`
 *

 * - The thunk operation determines the verb displayed when the loading indicator is displayed.
 * - The middleware parses the ID by the dashes, so only ever have 2 dashes max, 1 minimum.
 * - After the first dash is the subject, or what is the thunk saving, loading, etc
 * - After the second dash is the description. This is just to help differentiate it from other thunks.
 */
export enum ThunkOperation {
  GET = "GET",
  CREATE = "CREATE",
  UPSERT = "UPSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  PUT = "PUT",
}
