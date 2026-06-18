import { onBoardingApiServices } from "./api";
import type { HealthCardFormData } from "./types";

export const createHealthCard = (data: HealthCardFormData) =>
  onBoardingApiServices.createHealthCard<{ message: string }>(data);
