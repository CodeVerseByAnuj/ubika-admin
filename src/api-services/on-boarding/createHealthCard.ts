import { onBoardingApiServices } from "./api";
import type { HealthCardFormData } from "./type";

export const createHealthCard = (data: HealthCardFormData) =>
    onBoardingApiServices.createHealthCard<{ message: string }>(data);
