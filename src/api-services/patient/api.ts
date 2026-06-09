import { axiosInstance } from "../axoisInstance";

export const patientApiServices = {
    getAllergies: async function <T>(page: number): Promise<T> {
        try {
            const response = await axiosInstance.get(
                `/patient/allergies`,
                {
                    params: {
                        page,
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
