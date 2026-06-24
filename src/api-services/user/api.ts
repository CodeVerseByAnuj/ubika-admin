/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "../axiosInstance";

export const userApiServices = {
  getUser: async function <T>(): Promise<T> {
    try {
      const response = await axiosInstance.get("/user");
      return response.data;
    } catch (error: any) {
      console.error("Get user api error:", error);
      throw error?.response?.data || { message: "Something went wrong" };
    }
  },
};
