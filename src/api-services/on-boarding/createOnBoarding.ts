import { onBoardingApiServices } from "./api";
import type { OnBoardingPayload } from "./types";

export const createOnBoarding = (data: OnBoardingPayload) =>
  onBoardingApiServices.createOnBoarding<{ message: string }>(data);
