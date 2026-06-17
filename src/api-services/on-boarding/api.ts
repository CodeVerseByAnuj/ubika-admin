/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "../axoisInstance";

export const onBoardingApiServices = {
  createOnBoarding: async function <T>(data: any): Promise<T> {
    try {
      const response = await axiosInstance.post(
        `/patient/onboarding/demographics`,
        data,
      );
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
  createPrivacy: async function <T>(data: any): Promise<T> {
    try {
      const response = await axiosInstance.post(
        `/patient/onboarding/consent`,
        data,
      );
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
  createHealthCard: async function <T>(data: any): Promise<T> {
    try {
      const response = await axiosInstance.post(
        `/patient/onboarding/health-card`,
        data,
      );
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
  getEmrInstances: async function <T>(): Promise<T> {
    try {
      const response = await axiosInstance.get(`/emr-instances`);
      return response.data.data;
    } catch (error: any) {
      console.error("API Error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
  createEmrLinking: async function <T>(data: any): Promise<T> {
    try {
      const response = await axiosInstance.post(
        `/patient/onboarding/emr-linking`,
        data,
      );
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
  getCurrentPolicy: async function <T>(): Promise<T> {
    try {
      const response = await axiosInstance.get(
        `/patient/consent/policies/current`,
      );
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
};
