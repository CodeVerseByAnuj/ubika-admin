import { onBoardingApiServices } from "./api";
import type { OnBoardingPayload } from "./type";

export const createOnBoarding = (data: OnBoardingPayload) =>
    onBoardingApiServices.createOnBoarding<{ message: string }>(data);
