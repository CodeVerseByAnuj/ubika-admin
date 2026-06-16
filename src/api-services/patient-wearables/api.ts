/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "../axoisInstance";

export const patientWearablesApiServices = {
  getSummaries: async function <T>(
    summaryType: string,
    date: {
      startDate: string;
      endDate: string;
    },
  ): Promise<T> {
    try {
      const response = await axiosInstance.get(
        `/patient/wearables/summaries/${summaryType}`,
        {
          params: {
            start_date: date.startDate,
            end_date: date.endDate,
          },
        },
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
