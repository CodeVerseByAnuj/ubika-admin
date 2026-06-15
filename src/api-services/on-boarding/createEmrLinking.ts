import { onBoardingApiServices } from "./api";
import type { EmrLinkingFormData } from "./type";

export const createEmrLinking = (data: EmrLinkingFormData) =>
    onBoardingApiServices.createEmrLinking<{ message: string }>(data);
