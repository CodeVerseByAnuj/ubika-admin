import { onBoardingApiServices } from "./api";
import type { ConsentPolicy } from "./type";

export const getCurrentPolicy = () =>
    onBoardingApiServices.getCurrentPolicy<ConsentPolicy>();
