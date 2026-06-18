import { onBoardingApiServices } from "./api";
import type { ConsentPolicy } from "./types";

export const getCurrentPolicy = () =>
    onBoardingApiServices.getCurrentPolicy<ConsentPolicy>();
