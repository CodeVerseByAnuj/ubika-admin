/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // // Token get from localStorage
    // const token =
    //   typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // // Attach token
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,

  (error: AxiosError<any>) => {
    const customError: any = {
      status: 500,
      message: "Something went wrong",
    };

    if (!error.response) {
      customError.status = 0;

      // Timeout
      if (error.code === "ECONNABORTED") {
        customError.message = "Request timeout";
      }

      // Offline
      else if (!navigator.onLine) {
        customError.message = "No internet connection";
      }

      // CORS / Network Error
      else if (
        error.message === "Network Error" ||
        error.code === "ERR_NETWORK"
      ) {
        customError.message =
          "Unable to connect to server. Please check your internet or backend server.";
      }

      // Fallback
      else {
        customError.message = "Server is not responding";
      }

      return Promise.reject({ response: { data: customError } });
    }
    return Promise.reject(error);
  },
);
