import { axiosInstance } from "../axoisInstance";

export const onBoardingApiServices = {
    createOnBoarding: async function <T>(data: any): Promise<T> {
        try {
            const response = await axiosInstance.post(`/patient/onboarding/demographics`, data);
            return response.data;
        }
        catch (error: any) {
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
            const response = await axiosInstance.post(`/patient/onboarding/consent`, data);
            return response.data;
        }
        catch (error: any) {
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
            const response = await axiosInstance.get(`/patient/consent/policies/current`);
            return response.data;
        }
        catch (error: any) {
            console.error("API Error:", error);
            throw (
                error?.response?.data || {
                    message: "Something went wrong",
                }
            );
        }
    },
};  