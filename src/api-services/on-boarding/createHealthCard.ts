import { onBoardingApiServices } from "./api";
import { HealthCardFormData } from "./types";

export const createHealthCard = (data: HealthCardFormData) =>
    onBoardingApiServices.createHealthCard<{ message: string }>(data);
