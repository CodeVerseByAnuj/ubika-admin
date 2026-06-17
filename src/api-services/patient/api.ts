/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "../axoisInstance";

export const patientApiServices = {
  getAllergies: async function <T>(page: number): Promise<T> {
    try {
      const response = await axiosInstance.get(`/patient/allergies`, {
        params: {
          page,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Get patient allergies api error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
  getAppointments: async function <T>(queryParams: string): Promise<T> {
    try {
      const response = await axiosInstance.get(
        `/patient/appointments?${queryParams}`,
      );
      return response.data;
    } catch (error: any) {
      console.error("Get patient appointments api error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
  getAppointmentsDetails: async function <T>(
    appointmentId: number,
  ): Promise<T> {
    try {
      const response = await axiosInstance.get(
        `/patient/appointments/${appointmentId}`,
      );
      return response.data;
    } catch (error: any) {
      console.error("Get patient appointments details api error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
  getConditions: async function <T>(page: number): Promise<T> {
    try {
      const response = await axiosInstance.get(`/patient/conditions`, {
        params: {
          page,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Get patient conditions details api error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
  getHistory: async function <T>(appointmentId: number): Promise<T> {
    try {
      const response = await axiosInstance.get(`/patient/history`, {
        params: {
          appointmentId,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Get patient history details api error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
  getLabs: async function <T>(queryParams: string): Promise<T> {
    try {
      const response = await axiosInstance.get(`/patient/labs?${queryParams}`);
      return response.data;
    } catch (error: any) {
      console.error("Get patient labs api error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
  getLabDetails: async function <T>(labId: number): Promise<T> {
    try {
      const response = await axiosInstance.get(`/patient/labs/${labId}`);
      return response.data;
    } catch (error: any) {
      console.error("Get patient labs details api error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
  getMedications: async function <T>(queryParams: string): Promise<T> {
    try {
      const response = await axiosInstance.get(
        `/patient/medications?${queryParams}`,
      );
      return response.data;
    } catch (error: any) {
      console.error("Get patient medication api error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
  getMedicationDetails: async function <T>(medicationId: number): Promise<T> {
    try {
      const response = await axiosInstance.get(
        `/patient/medications/${medicationId}`,
      );
      return response.data;
    } catch (error: any) {
      console.error("Get patient medication details api error:", error);
      throw (
        error?.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  },
};
