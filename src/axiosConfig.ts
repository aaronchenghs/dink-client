import axios from "axios";
import { refreshToken } from "./services";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7015/api",
  withCredentials: true, // cookies
});

// request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        localStorage.setItem("token", newToken);
        axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
        originalRequest.headers.Authorization = "Bearer " + newToken;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
