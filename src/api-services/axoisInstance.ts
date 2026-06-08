import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,

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
